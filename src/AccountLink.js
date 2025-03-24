const axios = require('axios');
const { URLSearchParams } = require('url');

class AccountLink {
    static INFO = "https://krio.fr.nf/API/V1/GetAccountLinkInfo";
    static REMOVE = "https://krio.fr.nf/API/V1/RemoveAccountLink";
    static GET_EMAIL = "https://krio.fr.nf/API/V1/AccountLinks/GetEmail";
    static SEND_COMMENT = "https://krio.fr.nf/API/V1/AccountLinks/SendComment";
    static READ_COMMENTS = "https://krio.fr.nf/API/V1/AccountLinks/ReadComments";
    static LIKE = "https://krio.fr.nf/API/V1/AccountLinks/Like";
    static DISLIKE = "https://krio.fr.nf/API/V1/AccountLinks/Dislike";

    constructor(linkToken) {
        this.linkToken = linkToken;
        this.accountUsername = '';
        this.permissions = [];
        this.domain = '';
        this.date = null;
    }

    async initialize() {
        try {
            const json = await this.fetchApiData(`${AccountLink.INFO}?link-token=${this.linkToken}`);
            this.accountUsername = json.username;
            this.permissions = json.permissions;
            this.domain = json.domain;
            this.date = new Date(json.date);
        } catch (error) {
            throw new Error(`Failed to initialize AccountLink: ${error.message}`);
        }
    }

    async getEmail() {
        this.checkPermission('kaleron/email');
        const json = await this.fetchApiData(`${AccountLink.GET_EMAIL}?link-token=${this.linkToken}`);
        return json.email;
    }

    async sendComment(video, content) {
        this.checkPermission('krio/send-comment');
        const params = new URLSearchParams({ 'link-token': this.linkToken, video, content });
        await this.executePost(`${AccountLink.SEND_COMMENT}?${params.toString()}`);
    }

    async readComments(video) {
        this.checkPermission('krio/read-comments');
        const json = await this.fetchApiData(`${AccountLink.READ_COMMENTS}?link-token=${this.linkToken}&video=${video}`);
        return json.comments;
    }

    async toggleVideoLike(video) {
        this.checkPermission('krio/like');
        await this.executePost(`${AccountLink.LIKE}?link-token=${this.linkToken}&video=${video}`);
    }

    async toggleVideoDislike(video) {
        this.checkPermission('krio/like');
        await this.executePost(`${AccountLink.DISLIKE}?link-token=${this.linkToken}&video=${video}`);
    }

    async fetchApiData(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`API error (${url}): ${error.response?.data?.error || error.message}`);
        }
    }

    async executePost(url) {
        try {
            const response = await axios.post(url);
            if (response.status !== 200) {
                throw new Error(`API error (${url}): ${response.data.error}`);
            }
        } catch (error) {
            throw new Error(`API error (${url}): ${error.response?.data?.error || error.message}`);
        }
    }

    checkPermission(requiredPermission) {
        if (!this.permissions.includes(requiredPermission)) {
            throw new Error(`Insufficient permissions: ${requiredPermission}`);
        }
    }
}

module.exports = AccountLink;
