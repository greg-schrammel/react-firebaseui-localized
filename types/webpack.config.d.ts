export const mode: string;
export const entry: string;
export namespace output {
    const path: any;
    const filename: string;
    const library: string;
    const libraryTarget: string;
    const publicPath: string;
    const umdNamedDefine: boolean;
    const globalObject: string;
}
export namespace module {
    const rules: {
        test: RegExp;
        exclude: RegExp;
        loader: string;
        query: {
            presets: string[];
        };
    }[];
}
export namespace resolve {
    const extensions: string[];
    namespace alias {
        const react: any;
    }
}
export namespace externals {
    export namespace react_1 {
        const commonjs: string;
        const commonjs2: string;
        const amd: string;
        const root: string;
    }
    export { react_1 as react };
}
