module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface MyPluginConfig {
  enablePlugin?: boolean;
}
