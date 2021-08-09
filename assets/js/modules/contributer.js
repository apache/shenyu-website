import { $$ } from './utils';

export default function () {
    if (!$$('.contributor-list')) {
        return;
    }
    fetch("https://api.github.com/repos/apache/incubator-shenyu/contributors?page=1&per_page=10000").then(function (response) {
        return response.json();
    }).then(function (res) {
        let html = "";
        if (res && Array.isArray(res)) {
            res.forEach((c, i) => {
                if (i % 5 === 0) {
                    if (i > 0) {
                        html += "</tr>"
                    }
                    html += "<tr>"
                }
                html += `<td><a href="${c.html_url}" target="_blank"><img src="${c.avatar_url}" height="20" /> @${c.login}</a></td>`;
                if (i === res.length - 1) {
                    html += "</tr>"
                }
            })
        }
        $$('.contributor-list')[0].innerHTML = html;
    });

}