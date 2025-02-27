type Doc = {
    name?: string;
    url: string;
}

type Settings = {
    name?: string;
    logoUrl?: string;
    dark?: boolean;
    docs: Doc[];
}


const defaultSettings: Settings = {
    name: "Api Documentation",
    docs: []
}

export type { Doc, Settings }

export { defaultSettings }