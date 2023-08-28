<script lang="ts">
    import svelteLogo from "./assets/svelte.svg";
    import { accountStore } from "./store";
    import viteLogo from "/vite.svg";
    import {
        providers as getProviders,
        type IAccount,
        type IProvider,
    } from "@massalabs/wallet-provider";

    let connectedAddress: string | undefined;
    let balance: string | undefined;
    accountStore.subscribe(async (account) => {
        connectedAddress = account?.address();
        balance = await account?.balance().then((res) => res.finalBalance);
    });

    const printAddress = (address: string): string =>
        address.slice(0, 6) + "..." + address.slice(-4);

    const connect = async () => {
        const providers = await getProviders();
        const stationWallet = providers.find(
            (provider) => provider.name() === "MASSASTATION"
        );
        const bearbyWallet = providers.find(
            (provider) => provider.name() === "BEARBY"
        );
        if (!stationWallet && !bearbyWallet) return;

        const wallet = stationWallet || bearbyWallet;
        const accounts = await wallet.accounts();
        if (!accounts?.length) return;

        accountStore.set(accounts[0]);
    };

    const disconnect = () => {
        accountStore.set(null);
    };
</script>

<main>
    <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} class="logo" alt="Vite Logo" />
        </a>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
        </a>
    </div>
    <h1>Vite + Svelte</h1>

    <div class="card">
        {#if connectedAddress}
            <div>
                <p>{connectedAddress}</p>
                <p>Balance: {Number(balance).toFixed(2)} MAS</p>
            </div>
            <button on:click={disconnect}>Disconnect</button>
        {:else}
            <button on:click={connect}>Connect Wallet</button>
        {/if}
    </div>

    <p>
        Check out <a
            href="https://github.com/sveltejs/kit#readme"
            target="_blank"
            rel="noreferrer">SvelteKit</a
        >, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">
        Click on the Vite and Svelte logos to learn more
    </p>
</main>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
        color: #888;
    }
</style>
