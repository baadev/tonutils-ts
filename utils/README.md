
# Utils

A collection of utility modules designed to interact with and manipulate data related to TON in your scripts.

## Features

### Module `public.address.utils`

<table>
    <tr>
        <th>Function</th>
        <th>Description</th>
        <th>Example Output:</th>
    </tr>
    <tr>
        <td>getPublicAddressByWallet</td>
        <td>Returns the public address associated with a given wallet.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getPublicAddressByMnenomic</td>
        <td>Retrieves the public address associated with a given mnemonic.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getBouncableAddress</td>
        <td>Returns the bounceable address for the given address.</td>
        <td>
            <pre>EQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDpxZL</pre>
        </td>
    </tr>
    <tr>
        <td>getNonBouncableAddress</td>
        <td>Returns the non-bounceable address for the given address.</td>
        <td>
            <pre>UQCgBnDa0omfX3xW-UoxUZNn0fdCm7YWnaj1dVjZz_EDp0uO</pre>
        </td>
    </tr>
</table>

#### Usage

<table>
    <tr>
        <th>Function</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>getPublicAddressByWallet</td>
        <td>
            <pre lang="typescript"><code>getPublicAddressByWallet(WalletContractV4)</code></pre>
        </td>
    </tr>
    <tr>
        <td>getPublicAddressByMnenomic</td>
        <td>
            <pre lang="typescript"><code>await getPublicAddressByMnenomic("one two three...");</code></pre>
            <p>or</p>
            <pre lang="typescript"><code>await getPublicAddressByMnenomic(["one", "two", "three"]);</code></pre>
        </td>
    </tr>
    <tr>
        <td>getBouncableAddress</td>
        <td>
            <pre lang="typescript"><code>getBouncableAddress("UQ...");</code></pre>
        </td>
    </tr>
    <tr>
        <td>getNonBouncableAddress</td>
        <td>
            <pre lang="typescript"><code>getBouncableAddress("EQ...");</code></pre>
        </td>
    </tr>
</table>

### Module `create.wallet`

<table>
    <tr>
        <th>Function</th>
        <th>Description</th>
        <th>Output</th>
    </tr>
    <tr>
        <td>createWallet</td>
        <td>Returns a new wallet.</td>
        <td>
            <pre lang="typescript"><code>{ mnemonic, keyPair, generatedWallet }</code></pre>
        </td>
    </tr>
</table>

#### Usage

<table>
    <tr>
        <th>Function</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>createWallet</td>
        <td>
            <pre lang="typescript"><code>const { mnemonic, keyPair, generatedWallet } = await createWallet();</code></pre>
        </td>
    </tr>
</table>

#### Example as cmd tool

```bash
npx ts-node ./utils/mnemonic.to.public.ts -m 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt'

# Output:
Bounceable:  EQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JQ3Y
Non-Bounceable:  UQBDyloUvY25siQu-6XzJ4M7bBWUwUxGQ7BRC7oOB0R1JVAd
```