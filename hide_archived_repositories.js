// ==UserScript==
// @name         HideArchivedRepository
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide archived repository
// @author       eduidl
// @match        https://github.com/*
// @icon         https://github.com/favicon.ico
// @grant        none
// ==/UserScript==

const ARCHIVED_OPACITY = 0.3;

(function() {
    'use strict';

    const getRepos = () => {
        let container = document.getElementById('org-repositories');
        if (container == undefined) {
            container = document.getElementById('user-repositories-list');
        }
        if (container == undefined) {
            return [];
        }

        return container.getElementsByTagName('li');
    };

    const archived = (repo) => {
        const tags = repo.querySelectorAll('span.Label');
        for (const tag of tags) {
            if (tag.innerText.includes('archive')) {
                return true;
            }
        }
        return false;
    };

    const hideArchived = () => {
        const repos = getRepos();
        for (const repo of repos) {
            repo.style.opacity = archived(repo) ? ARCHIVED_OPACITY : 1.0;
        }
    };


    (function run() {
        hideArchived();
        setTimeout(run, 200);
    })();
})();