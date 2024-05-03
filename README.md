
# CrawlerBlocker Installation Guide

This repository contains scripts to block a predefined list of IP addresses and subnets using `iptables`. The scripts are available in three versions: Bash (Shell), Python, and Node.js. Follow the instructions below to set up and run the version that best suits your environment.

## Prerequisites

Before running these scripts, ensure you have the following installed on your system:
- **Shell**: No additional software is needed for Bash.
- **Python**: Python 3.x. [Download Python](https://www.python.org/downloads/)
- **Node.js**: Node.js 10.x or higher. [Download Node.js](https://nodejs.org/en/download/)

Additionally, you will need `sudo` or root access to modify `iptables` rules.

## Installation

Clone this repository to your local machine using:

```bash
git clone https://github.com/ThunderDoesDev/CrawlerBlocker.git
cd CrawlerBlocker
```

### Bash Script

1. Navigate to the directory containing the `crawler_blocker.sh`.
2. Make the script executable:

    ```bash
    chmod +x crawler_blocker.sh
    ```

### Python Script

1. Ensure Python 3.x is installed by running:

    ```bash
    python3 --version
    ```

2. Navigate to the directory containing the `crawler_blocker.py`.

### Node.js Script

1. Ensure Node.js is installed by running:

    ```bash
    node --version
    ```

2. Navigate to the directory containing the `crawler_blocker.js`.

## Usage

### Bash Script

Run the script with:

```bash
sudo ./crawler_blocker.sh
```

### Python Script

Run the script with:

```bash
sudo python3 crawler_blocker.py
```

### Node.js Script

Run the script with:

```bash
sudo node crawler_blocker.js
```

## License

This project is licensed under the MIT License - see the LICENSE file in the root directory of this project for details.

## Note

These scripts use `iptables` to block traffic from the specified IP addresses. They modify the system's firewall rules, so please ensure you have the appropriate permissions and understand the impact of these changes on your network security.
- **Web Crawlers**: Implementing these `iptables` rules will block traffic from most known web crawlers and bots that originate from the listed IP addresses and subnets.
- **Backend Security**: By blocking these IPs, your backend services will be hidden from these sources, enhancing the security of your server infrastructure.

## Support

For support, issues, or enhancements, please open an issue in this repository.

