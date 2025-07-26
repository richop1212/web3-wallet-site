document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Connected account:', account);

            // Now you have access to the user's wallet
            // You can perform transactions, read data, etc.
            // Example: Get the user's balance
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest']
            });
            console.log('Balance:', balance);

            // You can now interact with the user's wallet as needed
            // For example, you can send transactions, read smart contract data, etc.
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('MetaMask is not installed');
    }
});

document.getElementById('switchNetworkButton').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Switch to the Ethereum Mainnet
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }] // 0x1 is the chainId for Ethereum Mainnet
            });
            console.log('Switched to Mainnet');
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x1',
                                chainName: 'Ethereum Mainnet',
                                nativeCurrency: {
                                    name: 'Ether',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://mainnet.infura.io/v3/https://bsc-mainnet.infura.io/v3/6d06831fbc1d443d9b5d580ad97206ba'],
                                blockExplorerUrls: ['https://etherscan.io']
                            }
                        ]
                    });
                    console.log('Added Mainnet to MetaMask');
                } catch (addError) {
                    console.error('Failed to add Mainnet to MetaMask', addError);
                }
            } else {
                console.error('Failed to switch to Mainnet', switchError);
            }
        }
    } else {
        alert('MetaMask is not installed');
    }
});