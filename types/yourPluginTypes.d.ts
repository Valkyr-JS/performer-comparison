module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

interface ImportMetaEnv {
  readonly STORYBOOK_STASH_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface MyPluginConfig {
  enablePlugin?: boolean;
}
