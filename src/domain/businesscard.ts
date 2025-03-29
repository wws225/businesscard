
export class BusinessCard {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public skill: string,
        public github_id: string | undefined,
        public qiita_id: string | undefined,
        public x_id: string | undefined
    ) { }
    public static new(
        id: string,
        name: string,
        description: string,
        skill: string,
        github_id: string | undefined,
        qiita_id: string | undefined,
        x_id: string | undefined

    ): BusinessCard {
        const github = formatURL(github_id, "https://github.com/")
        const qiita = formatURL(qiita_id, "https://qiita.com/")
        const x = formatURL(x_id, "https://x.com/")
        return new BusinessCard(id, name, description, skill, github, qiita, x)
    }
}

function removeAtmak(str: string) {
    return str.startsWith("@") ? str.slice(1) : str;
}
function formatURL(id: string | undefined, url: string) {
    return id ? url + removeAtmak(id) : undefined
}