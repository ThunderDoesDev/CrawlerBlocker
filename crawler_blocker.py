import os
import subprocess
import logging

# Configure logging
logging.basicConfig(filename='/var/log/crawler_blocker.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logging.info("Starting CrawlerBlocker script.")

def run_command(command):
    try:
        subprocess.run(command, shell=True, check=True)
        logging.info(f"Successfully ran command: {command}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Command failed: {command} - {e}")
        raise

# Install iptables-persistent package
logging.info("Installing iptables-persistent package...")
run_command("apt-get install iptables-persistent -y")

# Flush existing iptables and ip6tables rules
logging.info("Flushing existing iptables and ip6tables rules...")
run_command("iptables -F")
run_command("ip6tables -F")

# Define the iptables rules
ipv4_ips = [
    "9.248.172.16", "66.240.192.138", "66.240.205.34", "66.240.219.146",
    # (additional IPs)
]

ipv6_ips = [
    "2602:80d:1000:b0cc:e::/80", "2620:96:e000:b0cc:e::/80",
    # (additional IPs)
]

user_agent = "Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)"

# Block IPv4 addresses
logging.info("Blocking IPv4 addresses...")
for ip in ipv4_ips:
    run_command(f"iptables -A INPUT -s {ip} -j DROP")
    run_command(f"iptables -A FORWARD -s {ip} -j DROP")

# Block IPv6 addresses
logging.info("Blocking IPv6 addresses...")
for ip in ipv6_ips:
    run_command(f"ip6tables -A INPUT -s {ip} -j DROP")
    run_command(f"ip6tables -A FORWARD -s {ip} -j DROP")

# Block HTTP requests with a specific User-Agent for IPv4
logging.info("Blocking HTTP requests with specific User-Agent...")
run_command(f"iptables -A INPUT -p tcp --dport 80 -m string --string \"{user_agent}\" --algo bm -j DROP")
run_command(f"iptables -A INPUT -p tcp --dport 443 -m string --string \"{user_agent}\" --algo bm -j DROP")

# Save the iptables rules to ensure they persist after a reboot
logging.info("Saving iptables rules...")
run_command("iptables-save > /etc/iptables/rules.v4")
run_command("ip6tables-save > /etc/iptables/rules.v6")

# Delete the script after execution
logging.info("Deleting the script.")
try:
    script_path = os.path.abspath(__file__)
    os.remove(script_path)
    logging.info(f"Successfully deleted the script: {script_path}")
except Exception as e:
    logging.error(f"Failed to delete the script: {e}")
    raise

logging.info("CrawlerBlocker script completed successfully.")