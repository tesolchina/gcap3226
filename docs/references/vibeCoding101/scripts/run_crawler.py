#!/usr/bin/env python3
"""
OFCA Crawler Configuration
Simple script to run the OFCA crawler with customizable settings
"""

from ofca_crawler import OFCACrawler

def run_limited_crawl():
    """Run a limited crawl for testing (50 pages max)"""
    print("Starting limited OFCA crawl (50 pages max)...")
    
    crawler = OFCACrawler(
        base_url="https://www.ofca.gov.hk",
        download_dir="ofca_crawl_limited"
    )
    
    crawler.crawl_site(max_pages=50, delay=2.0)
    print(f"Limited crawl completed! Check {crawler.download_dir} for results.")

def run_full_crawl():
    """Run a comprehensive crawl of the entire site"""
    print("Starting full OFCA crawl...")
    print("Warning: This may take several hours and use significant disk space!")
    
    response = input("Continue? (y/N): ")
    if response.lower() != 'y':
        print("Crawl cancelled.")
        return
    
    crawler = OFCACrawler(
        base_url="https://www.ofca.gov.hk",
        download_dir="ofca_crawl_full"
    )
    
    # More comprehensive settings for full crawl
    crawler.crawl_site(max_pages=2000, delay=1.5)
    print(f"Full crawl completed! Check {crawler.download_dir} for results.")

def run_custom_crawl():
    """Run crawler with custom settings"""
    print("Custom OFCA Crawler Setup")
    print("-" * 30)
    
    # Get user preferences
    try:
        max_pages = int(input("Maximum pages to crawl (default 100): ") or "100")
        delay = float(input("Delay between requests in seconds (default 2.0): ") or "2.0")
        download_dir = input("Download directory (default 'ofca_crawl_custom'): ") or "ofca_crawl_custom"
        
        print(f"\nStarting crawl with settings:")
        print(f"  Max pages: {max_pages}")
        print(f"  Delay: {delay}s")
        print(f"  Directory: {download_dir}")
        
        crawler = OFCACrawler(
            base_url="https://www.ofca.gov.hk",
            download_dir=download_dir
        )
        
        crawler.crawl_site(max_pages=max_pages, delay=delay)
        print(f"Custom crawl completed! Check {download_dir} for results.")
        
    except ValueError as e:
        print(f"Invalid input: {e}")
    except KeyboardInterrupt:
        print("\nCrawl interrupted by user.")

def main():
    """Main menu for crawler options"""
    print("OFCA Website Crawler")
    print("=" * 20)
    print("1. Limited crawl (50 pages - recommended for testing)")
    print("2. Full crawl (entire site - may take hours)")
    print("3. Custom crawl (specify your own settings)")
    print("4. Exit")
    
    while True:
        try:
            choice = input("\nSelect option (1-4): ").strip()
            
            if choice == "1":
                run_limited_crawl()
                break
            elif choice == "2":
                run_full_crawl()
                break
            elif choice == "3":
                run_custom_crawl()
                break
            elif choice == "4":
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please select 1-4.")
                
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()