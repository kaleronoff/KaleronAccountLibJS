# <img src="https://krio.fr.nf/Assets/KaleronAssetsL/LogoDark.png" alt="Kaleron Logo" width="30" height="30"> KaleronAccountLibJS


**KaleronAccountLibJS is a Node.js library designed to interact with the Kaleron Account Link API. It provides a simple and powerful way to perform various account-related actions such as retrieving email, sending comments, reading comments, liking/disliking videos, and more.**

## Features

- Get Account Email: Fetch the email associated with the linked account.

- Send Comment: Post comments to a video.

- Read Comments: Retrieve comments for a specific video.

- Like Video: Toggle the like status of a video.

- Dislike Video: Toggle the dislike status of a video.

- Permission-Based: The library checks for permissions before performing actions.

## Installation

To install the library, you can use npm:

`npm install kaleron-account-lib`

## Usage
### Example Usage

```javascript
const { AccountLink } = require('kaleron-account-lib');

async function main() {
    const accountLink = new AccountLink("your-link-token");
    await accountLink.initialize();

    console.log(`Account Username: ${accountLink.accountUsername}`);
    console.log(`Account Permissions: ${accountLink.permissions}`);

    // Fetch email
    const email = await accountLink.getEmail();
    console.log(`Account Email: ${email}`);

    // Send a comment to a video
    await accountLink.sendComment('video-id', 'This is a great video!');

    // Read comments from a video
    const comments = await accountLink.readComments('video-id');
    console.log(comments);

    // Toggle like/dislike on a video
    await accountLink.toggleVideoLike('video-id');
    await accountLink.toggleVideoDislike('video-id');
}

main().catch(console.error);
```

### Methods

- `initialize()`
Initializes the account link with the provided linkToken. It fetches the account's username, permissions, domain, and the date of linking.

- `getEmail()`
Retrieves the email address associated with the account.

- `sendComment(video, content)`
Sends a comment to a specific video.

- `readComments(video)`
Fetches the comments for a given video.

- `toggleVideoLike(video)`
Toggles the "like" status for a video.

- `toggleVideoDislike(video)`
Toggles the "dislike" status for a video.

### Error Handling

The library will throw errors for the following reasons:

- Invalid or missing permissions.

- API call failures (network issues, invalid responses).

- Invalid linkToken or video IDs.

### Permissions

Permissions must be included in the account to perform specific actions. The library will check the permissions before executing any action. If the account does not have the necessary permissions, an error will be thrown.

## License

This project is licensed under the NPL (v1) License - see the [LICENSE](LICENSE) file for details.