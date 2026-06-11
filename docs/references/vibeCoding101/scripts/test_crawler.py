#!/usr/bin/env python3
"""
Test script for OFCA Crawler
Tests basic functionality without doing a full crawl
"""

from ofca_crawler import OFCACrawler
import logging

def test_crawler():
    """Test basic crawler functionality"""
    print("Testing OFCA Crawler...")
    
    # Create crawler with test settings
    crawler = OFCACrawler(
        base_url="https://www.ofca.gov.hk",
        download_dir="test_crawl"
    )
    
    # Test robots.txt
    print(f"Testing robots.txt compliance...")
    test_urls = [
        "https://www.ofca.gov.hk/en/home/index.html",  # Should be allowed
        "https://www.ofca.gov.hk/App_Code/test.html",  # Should be disallowed
        "https://www.ofca.gov.hk/speedtest/test.html", # Should be disallowed
    ]
    
    for url in test_urls:
        can_fetch = crawler.can_fetch(url)
        print(f"  {url}: {'✓ Allowed' if can_fetch else '✗ Disallowed'}")
    
    # Test single page crawl
    print("\nTesting single page crawl...")
    test_url = "https://www.ofca.gov.hk/en/home/index.html"
    
    try:
        links = crawler.crawl_page(test_url)
        print(f"✓ Successfully crawled {test_url}")
        print(f"  Found {len(links)} links")
        print(f"  Saved to: {crawler.create_local_path(test_url)}")
        
        # Show first few links found
        if links:
            print("  Sample links found:")
            for i, link in enumerate(sorted(links)[:5]):
                print(f"    {i+1}. {link}")
                
    except Exception as e:
        print(f"✗ Error crawling {test_url}: {e}")
        
    print(f"\nTest completed. Files saved in: {crawler.download_dir}")
    
if __name__ == "__main__":
    test_crawler()