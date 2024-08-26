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

### Post-Execution Cleanup

- **Bash Script:** The Bash script will automatically delete itself after execution using `rm -- "$0"`. This helps to keep your environment clean, but be sure to keep a backup if you plan to reuse or modify the script.
  
- **Python and Node.js Scripts:** Both the Python and Node.js scripts are also designed to delete themselves after successful execution. Similar to the Bash script, ensure you have a backup if needed.

### Error Handling and Logging

All scripts include robust error handling to ensure that any issues are logged and the script exits gracefully. The logs are stored in `/var/log/crawler_blocker.log` for your review.

- **Error Handling:** Each script has mechanisms in place to catch and handle errors, preventing the scripts from failing silently.
- **Logging:** The scripts log their progress and any errors they encounter, allowing you to monitor the operations and troubleshoot if necessary.

Each script will install `iptables-persistent` before setting any iptables rules to ensure the rules persist after a reboot.

## License

This project is licensed under the APACHE License - see the [LICENSE](LICENSE) file for details.

## Note

These scripts leverage `iptables` to block incoming traffic from the specified IP addresses and subnets, which are known sources of many web crawlers and bots. By enforcing these rules, not only is traffic from these entities prevented, but your backend services will also be shielded from potential threats, significantly enhancing your server infrastructure's security. Please ensure you have the appropriate permissions to modify your system's firewall rules and fully understand the implications of these changes on your network's security.

## Changelogs

- Added functionality to delete the script after execution in Bash, Python, and Node.js versions.
- Included comprehensive error handling and logging to enhance script reliability.
- Removed references to `nftables` as it is no longer used.
- Ensured all instructions align with the updated scripts, which now include the full list of IP addresses and subnets.

## Support

For support, issues, or enhancements, please open an issue in this repository.