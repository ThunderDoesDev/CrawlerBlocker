const { execSync } = require('child_process');
const fs = require('fs');

const ipAddresses = [
    "9.248.172.16", "66.240.192.138", "66.240.205.34", "66.240.219.146",
    "66.240.236.119", "71.6.135.131", "71.6.146.130", "71.6.146.185",
    "71.6.146.186", "71.6.158.166", "71.6.165.200", "71.6.167.142",
    "80.82.77.33", "80.82.77.139", "82.221.105.6", "82.221.105.7",
    "85.25.43.94", "85.25.103.50", "89.248.167.131", "89.248.167.131",
    "89.248.172.16", "93.120.27.62", "93.174.95.106", "93.174.95.106",
    "93.174.95.106", "94.102.49.190", "94.102.49.190", "94.102.49.193",
    "99.102.49.193", "104.131.0.69", "104.236.198.48", "159.203.176.62",
    "162.159.244.38", "185.163.109.66", "185.163.109.66", "185.181.102.18",
    "185.181.102.18", "188.138.1.119", "188.138.9.50", "198.20.69.72",
    "198.20.69.79", "198.20.69.96", "198.20.69.103", "198.20.70.111",
    "198.20.70.119", "198.20.87.96", "198.20.87.103", "198.20.99.128",
    "198.20.99.135", "209.126.110.38", "216.117.2.180", "162.142.125.0/24",
    "167.94.138.0/24", "167.94.145.0/24", "167.94.146.0/24", "167.248.133.0/24",
    "199.45.154.0/24", "199.45.155.0/24", "206.168.34.0/24"
];

function blockIP(ip) {
    try {
        if (ip.includes(':')) {
            execSync(`ip6tables -A INPUT -s ${ip} -j DROP`);
            execSync(`ip6tables -A FORWARD -s ${ip} -j DROP`);
        } else {
            execSync(`iptables -A INPUT -s ${ip} -j DROP`);
            execSync(`iptables -A FORWARD -s ${ip} -j DROP`);
        }
    } catch (error) {
        console.error(`Failed to block IP ${ip}: ${error}`);
    }
}

function blockUserAgent() {
    try {
        execSync("iptables -A INPUT -p tcp --dport 80 -m string --string 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)' --algo bm -j DROP");
        execSync("iptables -A INPUT -p tcp --dport 443 -m string --string 'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)' --algo bm -j DROP");
    } catch (error) {
        console.error(`Failed to block User-Agent: ${error}`);
    }
}

function saveIptables() {
    try {
        execSync('iptables-save > /etc/iptables/rules.v4');
        execSync('ip6tables-save > /etc/iptables/rules.v6');
    } catch (error) {
        console.error('Failed to save iptables rules: ', error);
    }
}

function setupNftables() {
    try {
        const nftablesConfig = `#!/usr/sbin/nft -f

table inet filter {
    chain input {
        type filter hook input priority 0; policy accept;
        ip6 saddr 2602:80d:1000:b0cc:e::/80 drop
        ip6 saddr 2620:96:e000:b0cc:e::/80 drop
        ip6 saddr 2602:80d:1003::/112 drop
        ip6 saddr 2602:80d:1004::/112 drop
    }

    chain forward {
        type filter hook forward priority 0; policy accept;
        ip6 saddr 2602:80d:1000:b0cc:e::/80 drop
        ip6 saddr 2620:96:e000:b0cc:e::/80 drop
        ip6 saddr 2602:80d:1003::/112 drop
        ip6 saddr 2602:80d:1004::/112 drop
    }
}`;

        fs.writeFileSync('/etc/nftables.conf', nftablesConfig);
        execSync('nft -f /etc/nftables.conf');
        execSync('systemctl enable nftables');
    } catch (error) {
        console.error('Failed to set up nftables: ', error);
    }
}

function main() {
    ipAddresses.forEach(blockIP);
    blockUserAgent();
    saveIptables();
    setupNftables();
}

main();

