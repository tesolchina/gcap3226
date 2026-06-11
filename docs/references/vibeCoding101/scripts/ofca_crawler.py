#!/usr/bin/env python3
"""
OFCA Website Crawler
Crawls the OFCA website (https://www.ofca.gov.hk) while respecting robots.txt
Downloads all accessible pages to a local directory structure
"""

import requests
from bs4 import BeautifulSoup
import os
import time
import urllib.robotparser
from urllib.parse import urljoin, urlparse, unquote
import logging
from pathlib import Path
import hashlib
import json
from datetime import datetime
import re

class OFCACrawler:
    def __init__(self, base_url="https://www.ofca.gov.hk", download_dir="ofca_crawl"):
        self.base_url = base_url
        self.download_dir = Path(download_dir)
        self.visited_urls = set()
        self.failed_urls = set()
        self.crawl_stats = {
            'pages_crawled': 0,
            'pages_failed': 0,
            'start_time': None,
            'end_time': None
        }
        
        # Create download directory
        self.download_dir.mkdir(exist_ok=True)
        
        # Setup logging
        self.setup_logging()
        
        # Setup robots.txt parser
        self.setup_robots()
        
        # Setup session with headers
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        
    def setup_logging(self):
        """Setup logging configuration"""
        log_file = self.download_dir / "crawl_log.txt"
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def setup_robots(self):
        """Setup robots.txt parser"""
        self.robots_parser = urllib.robotparser.RobotFileParser()
        self.robots_parser.set_url(urljoin(self.base_url, '/robots.txt'))
        try:
            self.robots_parser.read()
            self.logger.info("Successfully loaded robots.txt")
        except Exception as e:
            self.logger.warning(f"Could not load robots.txt: {e}")
            
    def can_fetch(self, url):
        """Check if URL can be fetched according to robots.txt"""
        try:
            return self.robots_parser.can_fetch('*', url)
        except Exception:
            # If robots.txt check fails, be conservative and allow
            return True
            
    def normalize_url(self, url):
        """Normalize URL for consistent processing"""
        # Remove fragments
        url = url.split('#')[0]
        # Decode URL encoding
        url = unquote(url)
        # Ensure it starts with base URL
        if not url.startswith('http'):
            url = urljoin(self.base_url, url)
        return url
        
    def is_valid_page(self, url):
        """Check if URL should be crawled"""
        # Must be from the same domain
        if not url.startswith(self.base_url):
            return False
            
        # Check robots.txt
        if not self.can_fetch(url):
            return False
            
        # Skip certain file types
        skip_extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', 
                          '.zip', '.rar', '.mp4', '.avi', '.mp3', '.jpg', '.jpeg', 
                          '.png', '.gif', '.css', '.js', '.xml', '.rss']
        
        parsed_url = urlparse(url.lower())
        for ext in skip_extensions:
            if parsed_url.path.endswith(ext):
                return False
                
        return True
        
    def create_local_path(self, url):
        """Create local file path from URL"""
        parsed = urlparse(url)
        path = parsed.path.strip('/')
        
        # Handle root or empty paths
        if not path or path == 'index.html':
            path = 'index'
            
        # Replace problematic characters
        path = re.sub(r'[<>:"|?*]', '_', path)
        
        # Ensure .html extension
        if not path.endswith('.html') and not path.endswith('.htm'):
            if path.endswith('/') or not os.path.splitext(path)[1]:
                path = path.rstrip('/') + '.html'
                
        return self.download_dir / path
        
    def save_page(self, url, content):
        """Save page content to local file"""
        try:
            local_path = self.create_local_path(url)
            
            # Create directory if needed
            local_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save content
            with open(local_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            self.logger.info(f"Saved: {url} -> {local_path}")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to save {url}: {e}")
            return False
            
    def extract_links(self, html_content, base_url):
        """Extract all links from HTML content"""
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            links = set()
            
            # Find all anchor tags with href
            for link in soup.find_all('a', href=True):
                href = link['href']
                full_url = urljoin(base_url, href)
                full_url = self.normalize_url(full_url)
                
                if self.is_valid_page(full_url):
                    links.add(full_url)
                    
            return links
            
        except Exception as e:
            self.logger.error(f"Error extracting links from {base_url}: {e}")
            return set()
            
    def crawl_page(self, url):
        """Crawl a single page"""
        if url in self.visited_urls:
            return set()
            
        self.visited_urls.add(url)
        
        try:
            self.logger.info(f"Crawling: {url}")
            
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # Check content type
            content_type = response.headers.get('content-type', '').lower()
            if 'text/html' not in content_type:
                self.logger.info(f"Skipping non-HTML content: {url}")
                return set()
                
            # Save page
            if self.save_page(url, response.text):
                self.crawl_stats['pages_crawled'] += 1
            else:
                self.crawl_stats['pages_failed'] += 1
                self.failed_urls.add(url)
                return set()
                
            # Extract links
            new_links = self.extract_links(response.text, url)
            self.logger.info(f"Found {len(new_links)} new links on {url}")
            
            return new_links
            
        except requests.RequestException as e:
            self.logger.error(f"Failed to crawl {url}: {e}")
            self.crawl_stats['pages_failed'] += 1
            self.failed_urls.add(url)
            return set()
            
    def crawl_site(self, max_pages=1000, delay=1.0):
        """Crawl the entire site using breadth-first search"""
        self.crawl_stats['start_time'] = datetime.now()
        
        # Start with the home page
        urls_to_crawl = {urljoin(self.base_url, '/en/home/index.html')}
        all_discovered_urls = set(urls_to_crawl)
        
        self.logger.info(f"Starting crawl of {self.base_url}")
        self.logger.info(f"Max pages: {max_pages}, Delay: {delay}s")
        
        while urls_to_crawl and len(self.visited_urls) < max_pages:
            current_url = urls_to_crawl.pop()
            
            if current_url in self.visited_urls:
                continue
                
            # Crawl the page and get new links
            new_links = self.crawl_page(current_url)
            
            # Add new links to crawl queue
            for link in new_links:
                if link not in all_discovered_urls:
                    urls_to_crawl.add(link)
                    all_discovered_urls.add(link)
                    
            # Rate limiting
            time.sleep(delay)
            
            # Progress update
            if len(self.visited_urls) % 10 == 0:
                self.logger.info(f"Progress: {len(self.visited_urls)} pages crawled, "
                               f"{len(urls_to_crawl)} remaining in queue")
                
        self.crawl_stats['end_time'] = datetime.now()
        self.save_crawl_summary()
        
    def save_crawl_summary(self):
        """Save crawl summary and statistics"""
        summary = {
            'base_url': self.base_url,
            'total_pages_crawled': self.crawl_stats['pages_crawled'],
            'total_pages_failed': self.crawl_stats['pages_failed'],
            'start_time': self.crawl_stats['start_time'].isoformat() if self.crawl_stats['start_time'] else None,
            'end_time': self.crawl_stats['end_time'].isoformat() if self.crawl_stats['end_time'] else None,
            'duration_minutes': ((self.crawl_stats['end_time'] - self.crawl_stats['start_time']).total_seconds() / 60) if self.crawl_stats['start_time'] and self.crawl_stats['end_time'] else None,
            'visited_urls': list(self.visited_urls),
            'failed_urls': list(self.failed_urls)
        }
        
        summary_file = self.download_dir / "crawl_summary.json"
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
            
        self.logger.info(f"Crawl completed! Summary saved to {summary_file}")
        self.logger.info(f"Pages crawled: {self.crawl_stats['pages_crawled']}")
        self.logger.info(f"Pages failed: {self.crawl_stats['pages_failed']}")


def main():
    """Main function to run the crawler"""
    # Create crawler instance
    crawler = OFCACrawler(
        base_url="https://www.ofca.gov.hk",
        download_dir="ofca_crawl"
    )
    
    # Start crawling
    # Adjust max_pages and delay as needed
    crawler.crawl_site(max_pages=500, delay=2.0)
    
    print(f"\nCrawling completed!")
    print(f"Downloaded files are in: {crawler.download_dir}")
    print(f"Check crawl_log.txt and crawl_summary.json for details")


if __name__ == "__main__":
    main()