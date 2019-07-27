
/**
 * Cli Common Variable
 *
 * Created By SH
 */
const DEFAULT_PORT = 9000;

const DEFAULT_HOST = 'http://127.0.0.1';

exports.DEFAULT_PORT = DEFAULT_PORT;

exports.DEFAULT_SERVER_OPTIONS = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
};

exports.DEFAULT_WEBPACK_KEYS = [
  'amd', 'bail', 'cache', 'loader', 'parallelism', 'profile',
  'recordsPath', 'recordsInputPath', 'recordsOutputPath', 'context',
  'entry', 'output', 'module', 'resolve', 'resolveLoader', 'plugins',
  'devServer', 'devtool', 'targets', 'watch',
  'watchOptions','externals', 'performance', 'node', 'stats',
  'mode',
  'optimization'
];

exports.OUTPUT_PATH_MAP = {
  dev: 'dev',
  prd: 'dist'
};

exports.DEFAULT_CSS_LOADER_KEYS = {
  'css': 'css',
  'postcss': 'postcss',
  'sass': 'sass',
  'scss': 'scss',
  'less': 'less',
  'stylus': 'stylus',
  'vue': 'vue'
};

exports.DEFAULT_CSS_LOADER_CONFIG = {
  'css': {},
  'postcss': {},
  'sass': {
    indentedSyntax: true
  },
  'scss': {},
  'less': {},
  'stylus': {},
  'vue': {},
}

exports.DEFAULT_DLL_MANIFEST_PATH = 'dll/[name]-manifest.json';

exports.DEFAULT_DLL_FILES_PATH = 'dll/dll-files.json';

exports.DEFAULT_DLL_CHUNK_NAME = '__lib_[name]__';

exports.DEFAULT_CACHE_PATH = '.easy_cache';

exports.DEFAULT_CACHE_NAME = 'cache-manifest.json';
