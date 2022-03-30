interface ConfigDefinition {
    host: string
    port: number
    https: {
        enabled: boolean
        key?: string
        cert?: string
    }
    db: {
        password: string | (() => string) | (() => Promise<string>);
        username: string;
        host: string
        port: number
        database: string
    }
    debug: {
        stackSize: number
    }
    shutdown: {
        appKill: number
        serverClose: number
    }
}

declare module 'config' {
    const config: ConfigDefinition; // eslint-disable-line vars-on-top
    export default config;
}
