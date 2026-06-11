# OFCA Website Crawler

This Python script crawls the OFCA (Office of the Communications Authority) website at https://www.ofca.gov.hk while respecting robots.txt rules and downloads all accessible pages to a local directory.

## Features

- **Robots.txt Compliance**: Automatically reads and respects robots.txt rules
- **Rate Limiting**: Configurable delay between requests to be respectful to the server
- **Comprehensive Logging**: Detailed logs of crawling progress and any errors
- **Local File Structure**: Maintains website structure in local directory
- **Progress Tracking**: Real-time progress updates and final summary
- **Error Handling**: Robust error handling with retry capabilities
- **Content Filtering**: Skips binary files and focuses on HTML content

## Installation

1. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage
```bash
python ofca_crawler.py
```

### Customization Options

You can modify the crawler behavior by editing the `main()` function in `ofca_crawler.py`:

```python
crawler = OFCACrawler(
    base_url="https://www.ofca.gov.hk",
    download_dir="ofca_crawl"  # Change download directory
)

crawler.crawl_site(
    max_pages=500,  # Maximum pages to crawl
    delay=2.0       # Delay between requests (seconds)
)
```

## Output Structure

```
ofca_crawl/
├── crawl_log.txt          # Detailed crawling log
├── crawl_summary.json     # Summary statistics and URLs
├── index.html             # Home page
├── en/
│   ├── about/
│   │   └── ...
│   ├── consumer/
│   │   └── ...
│   └── ...
└── tc/                    # Traditional Chinese pages
    └── ...
```

## Configuration Options

### Crawler Settings
- `max_pages`: Maximum number of pages to crawl (default: 500)
- `delay`: Delay between requests in seconds (default: 2.0)
- `download_dir`: Local directory to save files (default: "ofca_crawl")

### Robots.txt Rules (automatically applied)
The crawler respects the following disallowed paths from robots.txt:
- `/App_Code/`
- `/http_error/`
- `/errorpages/`
- `/external/`
- `/facebook/`
- `/speedtest/`
- `/cr1/`
- `*.mp4` files
- Specific PDF files

## Logs and Monitoring

### Real-time Monitoring
The crawler provides real-time progress updates:
- Current page being crawled
- Number of pages completed
- Number of new links discovered
- Any errors encountered

### Log Files
- `crawl_log.txt`: Detailed log with timestamps
- `crawl_summary.json`: Final statistics and URL lists

## Best Practices

1. **Be Respectful**: The default 2-second delay is conservative. Don't reduce it too much.
2. **Monitor Progress**: Watch the logs to ensure the crawler is working as expected.
3. **Storage Space**: Be aware that crawling large sites requires significant disk space.
4. **Network**: Ensure stable internet connection for best results.

## Troubleshooting

### Common Issues

1. **Connection Errors**: Check internet connection and firewall settings
2. **Permission Denied**: Ensure write permissions in the download directory
3. **Memory Issues**: Reduce `max_pages` for large sites

### Error Recovery
The crawler automatically:
- Skips failed pages and continues
- Logs all errors for review
- Maintains statistics of successful vs failed downloads

## Legal Considerations

- This crawler respects robots.txt rules
- Be mindful of website terms of service
- Use responsibly and don't overload the server
- Consider reaching out to OFCA if you need extensive data access

## Support

Check the log files for detailed error messages. Common solutions:
- Increase delay between requests if getting rate limited
- Check internet connection if many requests fail
- Ensure sufficient disk space for downloads