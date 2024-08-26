const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = '/var/log/crawler_blocker.log';

const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
};

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
        log(`Successfully ran command: ${command}`);
    } catch (error) {
        log(`Command failed: ${command} - ${error.message}`);
        throw error;
    }
};

log("Starting CrawlerBlocker script.");

// Install iptables-persistent package
log("Installing iptables-persistent package...");
runCommand("apt-get install iptables-persistent -y");

// Flush existing iptables and ip6tables rules
log("Flushing existing iptables and ip6tables rules...");
runCommand("iptables -F");
runCommand("ip6tables -F");

// Define the iptables rules
const ipv4_ips = [
    "9.248.172.16", "66.240.192.138", "66.240.205.34", "66.240.219.146",
    "66.240.236.119", "71.6.135.131", "71.6.146.130", "71.6.146.185",
    "71.6.146.186", "71.6.158.166", "71.6.165.200", "71.6.167.142",
    "80.82.77.33", "80.82.77.139", "82.221.105.6", "82.221.105.7",
    "85.25.43.94", "85.25.103.50", "89.248.167.131", "89.248.172.16",
    "93.120.27.62", "93.174.95.106", "94.102.49.190", "94.102.49.193",
    "104.131.0.69", "104.236.198.48", "159.203.176.62", "162.159.244.38",
    "185.163.109.66", "185.181.102.18", "188.138.1.119", "188.138.9.50",
    "198.20.69.72", "198.20.69.79", "198.20.69.96", "198.20.69.103",
    "198.20.70.111", "198.20.70.119", "198.20.87.96", "198.20.87.103",
    "198.20.99.128", "198.20.99.135", "209.126.110.38", "216.117.2.180",
    "162.142.125.0/24", "167.94.138.0/24", "167.94.145.0/24", "167.94.146.0/24",
    "167.248.133.0/24", "199.45.154.0/24", "199.45.155.0/24", "206.168.34.0/24"
];

const ipv6_ips = [
    "2602:80d:1000:b0cc:e::/80", "2620:96:e000:b0cc:e::/80",
    "2602:80d:1003::/112", "2602:80d:1004::/112"
];

const userAgent = "Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)";

// Block IPv4 addresses
log("Blocking IPv4 addresses...");
ipv4_ips.forEach(ip => {
    runCommand(`iptables -A INPUT -s ${ip} -j DROP`);
    runCommand(`iptables -A FORWARD -s ${ip} -j DROP`);
});

// Block IPv6 addresses
log("Blocking IPv6 addresses...");
ipv6_ips.forEach(ip => {
    runCommand(`ip6tables -A INPUT -s ${ip} -j DROP`);
    runCommand(`ip6tables -A FORWARD -s ${ip} -j DROP`);
});

// Block HTTP requests with a specific User-Agent for IPv4
log("Blocking HTTP requests with specific User-Agent...");
runCommand(`iptables -A INPUT -p tcp --dport 80 -m string --string "${userAgent}" --algo bm -j DROP`);
runCommand(`iptables -A INPUT -p tcp --dport 443 -m string --string "${userAgent}" --algo bm -j DROP`);

// Save the iptables rules to ensure they persist after a reboot
log("Saving iptables rules...");
runCommand("iptables-save > /etc/iptables/rules.v4");
runCommand("ip6tables-save > /etc/iptables/rules.v6");

// Delete the script after execution
log("Deleting the script.");
try {
    const scriptPath = path.resolve(__filename);
    fs.unlinkSync(scriptPath);
    log(`Successfully deleted the script: ${scriptPath}`);
} catch (error) {
    log(`Failed to delete the script: ${error.message}`);
    throw error;
}

log("CrawlerBlocker script completed successfully.");