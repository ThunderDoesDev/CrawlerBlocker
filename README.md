
# CrawlerBlocker Installation Guide

This repository contains scripts to block a predefined list of IP addresses and subnets using `iptables`. The scripts are available in three versions: Bash (Shell), Python, and Node.js. Follow the instructions below to set up and run the version that best suits your environment.

## Prerequisites

Before running these scripts, ensure you have the following installed on your system:
- **Shell**: No additional software is needed for Bash.
- **Python**: Python 3.x. [Download Python](https://www.python.org/downloads/)
- **Node.js**: Node.js 10.x or higher. [Download Node.js](https://nodejs.org/en/download/)
- - **nftables**: Required for the nftables part of the script. Install using your package manager, for example:
  ```bash
  sudo apt-get install nftables

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

These scripts are available for educational purposes only under a strict non-commercial, non-distribution license. All rights are reserved.

Feel free to learn from and experiment with the code, but please respect the terms of use.

## Note

These scripts leverage `iptables` and `nftables` to block incoming traffic from the specified IP addresses and subnets, which are known sources of many web crawlers and bots. By enforcing these rules, not only is traffic from these entities prevented, but your backend services will also be shielded from potential threats, significantly enhancing your server infrastructure's security. Please ensure you have the appropriate permissions to modify your system's firewall rules and fully understand the implications of these changes on your network's security.


### Explanation of Updates
- Added a requirement for `nftables` in the prerequisites section.
- Included a note to install `nftables` using the package manager.
- Updated the note to mention the use of both `iptables` and `nftables`.

## Support

For support, issues, or enhancements, please open an issue in this repository.

