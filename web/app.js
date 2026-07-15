/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// 1. CONFIGURATION & MOCK DATA TEMPLATES
// ============================================================================

const REACT_TEMPLATE = {
  dirs: [
    'src/components/ui',
    'src/components/charts',
    'src/components/auth',
    'src/hooks',
    'src/pages',
    'src/context',
    'src/services',
    'src/utils',
    'src/styles',
    'src/types',
    'public/icons',
    'public/images',
    'tests/unit',
    'tests/e2e',
    'infra/docker',
    'infra/k8s'
  ],
  components: [
    'Button', 'Input', 'Card', 'Select', 'Modal', 'Dropdown', 'Tooltip', 'Toast', 'Sidebar', 'Header',
    'Footer', 'Table', 'Avatar', 'Badge', 'Alert', 'Tabs', 'Accordion', 'Sheet', 'Command', 'Dialog'
  ],
  pages: [
    'Dashboard', 'Analytics', 'Settings', 'Profile', 'Billing', 'Users', 'Logs', 'Auth', 'Login',
    'Register', 'ForgotPassword', 'NotFound', 'Overview', 'Reports', 'Audit', 'Integrations'
  ],
  hooks: [
    'useAuth', 'useFetch', 'useLocalStorage', 'useTheme', 'useDebounce', 'useWindowSize', 'useKeyPress',
    'useMediaQuery', 'usePrevious', 'useHover', 'useInterval', 'useClickOutside', 'useForm'
  ]
};

const LINUX_TEMPLATE = {
  subsystems: [
    'drivers/gpu/drm/i915',
    'drivers/gpu/drm/amd/amdgpu',
    'drivers/usb/core',
    'drivers/usb/host',
    'drivers/net/ethernet/intel',
    'drivers/net/wireless/realtek',
    'drivers/media/pci',
    'drivers/input/keyboard',
    'drivers/input/mouse',
    'fs/ext4',
    'fs/btrfs',
    'fs/proc',
    'kernel/sched',
    'kernel/locking',
    'kernel/time',
    'kernel/power',
    'net/ipv4',
    'net/ipv6',
    'net/bluetooth',
    'include/linux',
    'include/uapi/linux',
    'arch/x86/kernel',
    'arch/arm64/mm'
  ],
  files: [
    'core', 'init', 'main', 'utils', 'config', 'dev', 'sys', 'irq', 'mem', 'pci', 'power', 'pm', 'hw',
    'ioctl', 'buffer', 'state', 'engine', 'intel_guc', 'intel_hdmi', 'amdgpu_drv', 'amdgpu_device',
    'usb_bus', 'hub', 'message', 'ether_net', 'wlan_core', 'proc_fs', 'ext4_super', 'inode', 'dir',
    'sched_fair', 'mutex', 'spinlock', 'hr_timer', 'ipv4_route', 'tcp_ipv4', 'udp_core', 'bluetooth_hci'
  ]
};

const ENTERPRISE_TEMPLATE = {
  services: [
    'services/auth-service',
    'services/payment-gateway',
    'services/user-profile',
    'services/search-indexer',
    'services/notification-engine',
    'services/recommendation-api',
    'services/analytics-processor',
    'services/reporting-worker',
    'services/media-transcoder',
    'services/inventory-manager'
  ],
  libs: [
    'libs/shared-types',
    'libs/logger-winston',
    'libs/redis-cache',
    'libs/db-connector',
    'libs/security-jwt',
    'libs/event-emitter',
    'libs/http-client',
    'libs/validator-schemas'
  ],
  infra: [
    'deployments/kubernetes/helm',
    'deployments/terraform/modules',
    'deployments/github-workflows',
    'deployments/aws-ecs'
  ],
  extensions: ['ts', 'js', 'json', 'yaml', 'md', 'sh', 'sql', 'go', 'proto']
};

const DEFAULT_CUSTOM_PATHS = [
  'package.json',
  'src/index.js',
  'src/components/button.js',
  'src/components/card.js',
  'src/components/sidebar.js',
  'src/utils/math.js',
  'src/utils/string.js',
  'tests/index.test.js',
  'tests/components.test.js',
  'README.md',
  '.gitignore'
];

function generateReactProject() {
  const paths = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.js',
    'README.md',
    '.gitignore',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css',
  ];

  REACT_TEMPLATE.dirs.forEach(dir => {
    if (dir.includes('ui')) {
      REACT_TEMPLATE.components.forEach(comp => {
        paths.push(`${dir}/${comp}.tsx`);
        paths.push(`${dir}/${comp}.test.tsx`);
      });
    } else if (dir.includes('hooks')) {
      REACT_TEMPLATE.hooks.forEach(hook => {
        paths.push(`${dir}/${hook}.ts`);
      });
    } else if (dir.includes('pages')) {
      REACT_TEMPLATE.pages.forEach(page => {
        paths.push(`${dir}/${page}.tsx`);
        paths.push(`${dir}/${page}.css`);
      });
    } else {
      ['index.ts', 'types.ts', 'helper.ts', 'constants.ts', 'validator.ts'].forEach(file => {
        paths.push(`${dir}/${file}`);
      });
    }
  });

  for (let i = 1; i <= 24; i++) {
    paths.push(`public/icons/icon_${i}.svg`);
  }
  for (let i = 1; i <= 10; i++) {
    paths.push(`public/images/hero_banner_${i}.jpg`);
  }

  return paths;
}

function generateLinuxProject() {
  const paths = [
    'Makefile',
    'Kconfig',
    'COPYING',
    'MAINTAINERS',
    'CREDITS',
    'README',
    '.config'
  ];

  LINUX_TEMPLATE.subsystems.forEach(sub => {
    LINUX_TEMPLATE.files.forEach(file => {
      const isHeader = Math.random() > 0.5;
      const ext = isHeader ? 'h' : 'c';
      paths.push(`${sub}/${file}.${ext}`);
      
      if (Math.random() > 0.7) {
        paths.push(`${sub}/${file}_helper.${ext}`);
      }
      if (Math.random() > 0.85) {
        paths.push(`${sub}/${file}_debug.c`);
      }
      if (Math.random() > 0.9) {
        paths.push(`${sub}/${file}_test.c`);
      }
    });
  });

  return paths;
}

function generateEnterpriseProject() {
  const paths = [
    'WORKSPACE',
    'BUILD.bazel',
    'docker-compose.yml',
    'lerna.json',
    'nx.json',
    'package.json',
    'README.md'
  ];

  ENTERPRISE_TEMPLATE.services.forEach(svc => {
    paths.push(`${svc}/package.json`);
    paths.push(`${svc}/Dockerfile`);
    paths.push(`${svc}/README.md`);
    
    const srcDirs = ['src', 'src/controllers', 'src/models', 'src/repositories', 'src/services', 'src/routes', 'tests'];
    srcDirs.forEach(dir => {
      ['index', 'app', 'config', 'utils', 'handler', 'schema', 'types', 'db'].forEach(name => {
        paths.push(`${svc}/${dir}/${name}.ts`);
      });
    });
  });

  ENTERPRISE_TEMPLATE.libs.forEach(lib => {
    paths.push(`${lib}/package.json`);
    paths.push(`${lib}/README.md`);
    paths.push(`${lib}/src/index.ts`);
    for (let i = 1; i <= 15; i++) {
      paths.push(`${lib}/src/helper_${i}.ts`);
    }
  });

  ENTERPRISE_TEMPLATE.infra.forEach(infra => {
    for (let i = 1; i <= 20; i++) {
      const ext = infra.includes('helm') || infra.includes('workflows') ? 'yaml' : 'tf';
      paths.push(`${infra}/file_${i}.${ext}`);
    }
  });

  return paths;
}

const MOCK_PROJECTS = [
  {
    id: 'react-app',
    name: 'React Dashboard',
    description: 'A frontend web application styled with Tailwind, comprising UI kits, custom state hooks, router pages, and assets.',
    fileCount: 0,
    icon: 'Layers',
    filePaths: []
  },
  {
    id: 'linux-kernel',
    name: 'Linux Drivers Subset',
    description: 'A deeply nested structural directory from the Linux kernel source repository including GPU, Net, USB subsystems, and headers.',
    fileCount: 0,
    icon: 'Cpu',
    filePaths: []
  },
  {
    id: 'ent-monorepo',
    name: 'Enterprise Monorepo',
    description: 'A massive corporate monorepo featuring multiple TypeScript microservices, shared libraries, Bazel builds, and K8s configuration.',
    fileCount: 0,
    icon: 'Server',
    filePaths: []
  }
];

// Initialize paths programmatically
MOCK_PROJECTS[0].filePaths = generateReactProject();
MOCK_PROJECTS[0].fileCount = MOCK_PROJECTS[0].filePaths.length;

MOCK_PROJECTS[1].filePaths = generateLinuxProject();
MOCK_PROJECTS[1].fileCount = MOCK_PROJECTS[1].filePaths.length;

MOCK_PROJECTS[2].filePaths = generateEnterpriseProject();
MOCK_PROJECTS[2].fileCount = MOCK_PROJECTS[2].filePaths.length;


// ============================================================================
// 2. UTILS (INDEXER ENGINE)
// ============================================================================

function buildFileTree(paths) {
  const root = {
    name: 'root',
    path: '',
    type: 'directory',
    children: [],
    depth: 0,
  };

  paths.forEach(rawPath => {
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/').filter(p => p.length > 0);
    
    let currentNode = root;
    let accumulatedPath = '';

    parts.forEach((part, index) => {
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${part}` : part;
      const isFile = index === parts.length - 1;

      if (!currentNode.children) {
        currentNode.children = [];
      }

      let child = currentNode.children.find(c => c.name === part);

      if (!child) {
        let size;
        if (isFile) {
          size = estimateFileSize(part);
        }

        child = {
          name: part,
          path: accumulatedPath,
          type: isFile ? 'file' : 'directory',
          depth: index + 1,
          ...(isFile ? { size } : { children: [] }),
        };
        currentNode.children.push(child);
      }

      currentNode = child;
    });
  });

  sortTreeNodes(root);
  return root;
}

function sortTreeNodes(node) {
  if (node.children) {
    node.children.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortTreeNodes);
  }
}

function estimateFileSize(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
    case 'js':
    case 'jsx':
      return Math.floor(1024 + Math.random() * 45000);
    case 'json':
      return Math.floor(500 + Math.random() * 150000);
    case 'yml':
    case 'yaml':
      return Math.floor(200 + Math.random() * 10000);
    case 'md':
      return Math.floor(100 + Math.random() * 30000);
    case 'c':
    case 'h':
      return Math.floor(512 + Math.random() * 80000);
    case 'svg':
      return Math.floor(400 + Math.random() * 8000);
    case 'jpg':
    case 'jpeg':
    case 'png':
      return Math.floor(50000 + Math.random() * 2000000);
    default:
      return Math.floor(100 + Math.random() * 5000);
  }
}

function computeIndexStats(directoryName, paths, indexingTimeMs) {
  let totalFiles = 0;
  let totalDirectories = 0;
  let maxDepth = 0;
  let totalSize = 0;
  const extensionBreakdown = {};
  const seenDirs = new Set();

  paths.forEach(rawPath => {
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/').filter(p => p.length > 0);
    
    totalFiles++;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const dirPath = parts.slice(0, i + 1).join('/');
      seenDirs.add(dirPath);
    }

    maxDepth = Math.max(maxDepth, parts.length);
    totalSize += estimateFileSize(parts[parts.length - 1] || '');

    const filename = parts[parts.length - 1] || '';
    const lastDot = filename.lastIndexOf('.');
    const ext = lastDot !== -1 ? filename.slice(lastDot + 1).toLowerCase() : 'no extension';
    extensionBreakdown[ext] = (extensionBreakdown[ext] || 0) + 1;
  });

  totalDirectories = seenDirs.size;
  const memoryFootprintKb = Math.floor(paths.length * 0.42 + totalDirectories * 0.5);

  return {
    directoryName,
    totalFiles,
    totalDirectories,
    depth: maxDepth,
    totalSize,
    extensionBreakdown,
    indexingTimeMs,
    memoryFootprintKb,
  };
}

function searchPaths(paths, params) {
  const { inputDir, pattern, threshold, searchFileNamesOnly } = params;
  
  const cleanPattern = pattern.replace(/^\*+/, '').replace(/\*+$/, '').toLowerCase();

  const normalizedInputDir = inputDir.replace(/\\/g, '/').toLowerCase().trim();
  const activePaths = paths.filter(p => {
    if (!normalizedInputDir || normalizedInputDir === '/' || normalizedInputDir === 'k:\\searchme') {
      return true;
    }
    const lowerP = p.replace(/\\/g, '/').toLowerCase();
    return lowerP.startsWith(normalizedInputDir);
  });

  const results = [];

  if (!pattern || pattern === '*') {
    activePaths.forEach(p => {
      const parts = p.split('/');
      const fileName = parts[parts.length - 1] || '';
      const ext = fileName.split('.').pop() || '';
      results.push({
        path: p,
        fileName,
        score: 1.0,
        size: estimateFileSize(fileName),
        extension: ext,
        matchedIndices: [],
      });
    });
    return results;
  }

  activePaths.forEach(p => {
    const parts = p.split('/');
    const fileName = parts[parts.length - 1] || '';
    const ext = fileName.split('.').pop() || '';
    
    const target = searchFileNamesOnly ? fileName : p;
    const targetLower = target.toLowerCase();

    let isMatch = false;
    let score = 0;
    let matchedIndices = [];

    if (targetLower.includes(cleanPattern)) {
      isMatch = true;
      const startIndex = targetLower.indexOf(cleanPattern);
      
      const lengthRatio = cleanPattern.length / target.length;
      score = 0.6 + lengthRatio * 0.4;
      
      if (!searchFileNamesOnly && fileName.toLowerCase().includes(cleanPattern)) {
        score += 0.1;
      }
      
      score = Math.min(score, 1.0);

      for (let i = 0; i < cleanPattern.length; i++) {
        matchedIndices.push(startIndex + i);
      }
    } else {
      let patternIdx = 0;
      let targetIdx = 0;
      const tempIndices = [];
      let gapPenalties = 0;
      let lastMatchIdx = -1;

      while (patternIdx < cleanPattern.length && targetIdx < targetLower.length) {
        if (cleanPattern[patternIdx] === targetLower[targetIdx]) {
          tempIndices.push(targetIdx);
          if (lastMatchIdx !== -1 && targetIdx - lastMatchIdx > 1) {
            gapPenalties += (targetIdx - lastMatchIdx - 1);
          }
          lastMatchIdx = targetIdx;
          patternIdx++;
        }
        targetIdx++;
      }

      if (patternIdx === cleanPattern.length) {
        isMatch = true;
        matchedIndices = tempIndices;
        
        const matchedCharRatio = cleanPattern.length / target.length;
        const gapPenaltyModifier = Math.max(0, 1 - (gapPenalties / 10));
        score = (0.4 * matchedCharRatio) + (0.6 * gapPenaltyModifier);
        score = Math.max(0.1, Math.min(score, 0.95));
      }
    }

    if (isMatch) {
      const difference = 1.0 - score;
      if (difference <= threshold) {
        results.push({
          path: p,
          fileName,
          score: score,
          size: estimateFileSize(fileName),
          extension: ext,
          matchedIndices,
        });
      }
    }
  });

  return results.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.01) {
      return b.score - a.score;
    }
    return a.path.length - b.path.length;
  });
}


// ============================================================================
// 3. STATE MANAGEMENT
// ============================================================================

let state = {
  activeProject: MOCK_PROJECTS[0],
  filePaths: MOCK_PROJECTS[0].filePaths,
  stats: null,
  
  searchParams: {
    inputDir: 'src', // React Dashboard default
    pattern: '*button*',
    threshold: 0.45,
    outputFile: 'results.txt',
    searchFileNamesOnly: false,
  },

  lastSearchTimeMs: 0.025,
  lastMatchesCount: 0,
  searchResults: [],

  terminalLines: [],
  terminalHistory: [],
  terminalHistoryIdx: -1,

  expandedTreeNodes: { '': true }, // True for root, children expands as well
  treeSearchTerm: '',
  
  isIndexing: false,
};


// ============================================================================
// 4. UI RENDERING METHODS (Surgical DOM manipulation)
// ============================================================================

function renderProjectSelectors() {
  const container = document.getElementById('project-selectors-container');
  if (!container) return;

  container.innerHTML = MOCK_PROJECTS.map(proj => {
    const isSelected = state.activeProject.id === proj.id;
    let iconHTML = '';
    
    switch (proj.icon) {
      case 'Layers':
        iconHTML = `<i data-lucide="layers" class="w-5 h-5 text-indigo-400"></i>`;
        break;
      case 'Cpu':
        iconHTML = `<i data-lucide="cpu" class="w-5 h-5 text-emerald-400"></i>`;
        break;
      case 'Server':
        iconHTML = `<i data-lucide="server" class="w-5 h-5 text-sky-400"></i>`;
        break;
      default:
        iconHTML = `<i data-lucide="database" class="w-5 h-5 text-purple-400"></i>`;
    }

    return `
      <div
        data-project-id="${proj.id}"
        class="project-card p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
          isSelected 
            ? 'bg-neutral-800/80 border-amber-500/50 shadow-md shadow-amber-950/10' 
            : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
        }"
      >
        <div class="flex items-start gap-3">
          <div class="p-1.5 rounded-md ${isSelected ? 'bg-neutral-700 text-amber-500' : 'bg-neutral-900 text-neutral-400'}">
            ${iconHTML}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-semibold text-neutral-100 truncate">${proj.name}</h3>
              <span class="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                ${proj.fileCount.toLocaleString()} paths
              </span>
            </div>
            <p class="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
              ${proj.description}
            </p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add click events to newly rendered project cards
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      const project = MOCK_PROJECTS.find(p => p.id === projId);
      if (project) {
        selectProject(project);
      }
    });
  });

  lucide.createIcons();
}

function renderStats() {
  if (!state.stats) return;

  const totalFilesEl = document.getElementById('stat-total-files');
  const indexTimeEl = document.getElementById('stat-index-time');
  const nestingDepthEl = document.getElementById('stat-nesting-depth');
  const memoryFootprintEl = document.getElementById('stat-memory-footprint');
  const footerParsedEl = document.getElementById('footer-parsed-nodes-text');
  const explorerCountEl = document.getElementById('explorer-node-count-badge');

  if (totalFilesEl) totalFilesEl.textContent = state.stats.totalFiles.toLocaleString();
  if (indexTimeEl) indexTimeEl.textContent = `${state.stats.indexingTimeMs.toFixed(2)}ms`;
  if (nestingDepthEl) nestingDepthEl.textContent = `${state.stats.depth} folders`;
  if (memoryFootprintEl) memoryFootprintEl.textContent = `${state.stats.memoryFootprintKb} KB`;
  if (footerParsedEl) footerParsedEl.textContent = `Active File Matrices: ${state.filePaths.length.toLocaleString()} nodes parsed`;
  if (explorerCountEl) explorerCountEl.textContent = `${state.filePaths.length.toLocaleString()} indexed files`;

  renderExtensionChart();
}

function renderExtensionChart() {
  const container = document.getElementById('extension-list-container');
  if (!container || !state.stats) return;

  const sortedExtensions = Object.entries(state.stats.extensionBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalExtCount = sortedExtensions.reduce((sum, [_, count]) => sum + count, 0);

  container.innerHTML = sortedExtensions.map(([ext, count]) => {
    const percentage = totalExtCount > 0 ? (count / totalExtCount) * 100 : 0;
    return `
      <div class="flex flex-col text-[10px]">
        <div class="flex justify-between items-center text-neutral-300 font-mono text-[9px] mb-0.5">
          <span class="bg-neutral-800 px-1.5 py-0.2 rounded text-[9px] border border-neutral-750 text-neutral-400 font-medium">
            .${ext}
          </span>
          <span class="text-neutral-500">${count} files (${percentage.toFixed(0)}%)</span>
        </div>
        <div class="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full bg-amber-500/80 transition-all duration-500"
            style="width: ${Math.max(4, percentage)}%"
          ></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTerminalLines() {
  const container = document.getElementById('terminal-lines-container');
  if (!container) return;

  container.innerHTML = state.terminalLines.map(line => {
    let colorClass = 'text-neutral-300';
    if (line.type === 'input') colorClass = 'text-amber-500 font-semibold';
    else if (line.type === 'error') colorClass = 'text-rose-400';
    else if (line.type === 'success') colorClass = 'text-emerald-400 font-medium';
    else if (line.type === 'info') colorClass = 'text-sky-400';

    return `
      <div class="whitespace-pre-wrap leading-relaxed select-text font-mono">
        <span class="${colorClass}">${line.text}</span>
      </div>
    `;
  }).join('');

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function renderSearchResults() {
  const viewport = document.getElementById('search-results-viewport');
  if (!viewport) return;

  if (state.searchResults.length === 0) {
    viewport.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div class="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-600 mb-3">
          <i data-lucide="search" class="w-6 h-6"></i>
        </div>
        <h3 class="text-sm font-semibold text-neutral-300">No paths matched current filters</h3>
        <p class="text-xs text-neutral-500 max-w-sm mt-1 leading-normal">
          Try decreasing the threshold to allow fuzzier matching or broaden your search pattern.
        </p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const resultsHTML = state.searchResults.slice(0, 100).map((result, idx) => {
    const scorePercent = (result.score * 100).toFixed(0);
    const isHighMatch = result.score >= 0.85;
    const sizeStr = formatBytes(result.size);

    // Highlight text based on matched indices
    let pathDisplay = '';
    const textToRender = state.searchParams.searchFileNamesOnly ? result.fileName : result.path;

    if (!result.matchedIndices || result.matchedIndices.length === 0) {
      pathDisplay = `<span class="text-neutral-300">${textToRender}</span>`;
    } else {
      const indexSet = new Set(result.matchedIndices);
      let elements = [];
      for (let i = 0; i < textToRender.length; i++) {
        if (indexSet.has(i)) {
          elements.push(
            `<span class="text-amber-400 font-bold bg-amber-500/10 border-b border-amber-400/30">${textToRender[i]}</span>`
          );
        } else {
          elements.push(`<span class="text-neutral-300">${textToRender[i]}</span>`);
        }
      }
      pathDisplay = elements.join('');
    }

    let fullPathHTML = '';
    if (state.searchParams.searchFileNamesOnly) {
      const dirPart = result.path.substring(0, result.path.lastIndexOf('/') + 1);
      fullPathHTML = `<span class="text-neutral-500">${dirPart}</span>${pathDisplay}`;
    } else {
      fullPathHTML = pathDisplay;
    }

    return `
      <tr class="hover:bg-neutral-900/40 group transition-all font-mono text-xs border-b border-neutral-900">
        <!-- Score Circle -->
        <td class="py-2 px-4 text-center">
          <span class="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
            isHighMatch 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }">
            ${scorePercent}%
          </span>
        </td>

        <!-- Path with highlighting -->
        <td class="py-2 px-4 select-all text-[11px] truncate max-w-xl">
          <div class="flex items-center gap-1.5">
            <i data-lucide="file" class="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-500/80 transition-colors shrink-0"></i>
            <span class="text-neutral-500 truncate">
              ${fullPathHTML}
            </span>
          </div>
        </td>

        <!-- Extension badge -->
        <td class="py-2 px-4">
          <span class="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
            ${result.extension || 'no-ext'}
          </span>
        </td>

        <!-- File Size -->
        <td class="py-2 px-4 text-right text-neutral-400 text-[11px]">
          ${sizeStr}
        </td>
      </tr>
    `;
  }).join('');

  viewport.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-neutral-850 text-[9px] font-bold text-neutral-400 uppercase font-mono tracking-wider bg-neutral-900/50 select-none">
            <th class="py-2.5 px-4 w-16 text-center">Score</th>
            <th class="py-2.5 px-4">Indexed File Path</th>
            <th class="py-2.5 px-4 w-28">Extension</th>
            <th class="py-2.5 px-4 w-24 text-right">Size</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-900 font-mono text-xs">
          ${resultsHTML}
        </tbody>
      </table>
      
      ${state.searchResults.length > 100 ? `
        <div class="p-4 border-t border-neutral-900 text-center text-xs text-neutral-500 select-none">
          Showing top 100 results. Write/Download output file to view all ${state.searchResults.length} matches.
        </div>
      ` : ''}
    </div>
  `;

  lucide.createIcons();
}

function renderFileTree() {
  const container = document.getElementById('file-tree-viewport');
  if (!container) return;

  const rootNode = buildFileTree(state.filePaths);
  
  function isNodeMatching(node) {
    if (!state.searchParams.pattern || state.searchParams.pattern === '*') return false;
    
    const cleanPattern = state.searchParams.pattern.replace(/^\*+/, '').replace(/\*+$/, '').toLowerCase();
    const target = state.searchParams.searchFileNamesOnly ? node.name : node.path;
    
    return target.toLowerCase().includes(cleanPattern);
  }

  function getFileIconHTML(filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
      case 'ts':
      case 'js':
        return `<i data-lucide="file-code" class="w-3.5 h-3.5 text-sky-400 shrink-0"></i>`;
      case 'json':
      case 'yaml':
      case 'yml':
        return `<i data-lucide="settings" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>`;
      case 'md':
      case 'txt':
        return `<i data-lucide="file-text" class="w-3.5 h-3.5 text-neutral-400 shrink-0"></i>`;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'svg':
        return `<i data-lucide="file-image" class="w-3.5 h-3.5 text-purple-400 shrink-0"></i>`;
      case 'c':
      case 'h':
      case 'cpp':
        return `<i data-lucide="file-code" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>`;
      default:
        return `<i data-lucide="binary" class="w-3.5 h-3.5 text-neutral-500 shrink-0"></i>`;
    }
  }

  function renderNodeHTML(node) {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = !!state.expandedTreeNodes[node.path];
    const isMatching = isNodeMatching(node);

    // Apply tree filtering locally
    const filteredChildren = node.children?.filter(child => {
      if (!state.treeSearchTerm) return true;
      return child.path.toLowerCase().includes(state.treeSearchTerm.toLowerCase());
    });

    let childrenHTML = '';
    if (hasChildren && isExpanded && filteredChildren) {
      childrenHTML = filteredChildren.map(child => renderNodeHTML(child)).join('');
      if (filteredChildren.length === 0) {
        childrenHTML = `
          <div class="text-[10px] text-neutral-600 font-mono pl-6 py-1 select-none">
            No nested paths match filter
          </div>
        `;
      }
    }

    const arrowIcon = isExpanded 
      ? `<i data-lucide="chevron-down" class="w-3.5 h-3.5 shrink-0"></i>` 
      : `<i data-lucide="chevron-right" class="w-3.5 h-3.5 shrink-0"></i>`;

    const folderIcon = isExpanded 
      ? `<i data-lucide="folder-open" class="w-4 h-4 text-amber-500 shrink-0"></i>` 
      : `<i data-lucide="folder" class="w-4 h-4 text-amber-500/90 shrink-0"></i>`;

    return `
      <div class="pl-3.5 select-none font-mono text-xs">
        <!-- Node row -->
        <div 
          class="group flex items-center gap-1.5 py-1 px-1.5 rounded-md transition-all ${
            node.path ? 'hover:bg-neutral-800/60' : ''
          } ${
            isMatching 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10 font-semibold shadow-inner shadow-amber-950/20' 
              : 'text-neutral-300'
          }"
        >
          <!-- Chevron -->
          ${hasChildren ? `
            <button 
              data-toggle-path="${node.path}"
              class="tree-toggle-btn p-0.5 rounded hover:bg-neutral-700/80 text-neutral-500 hover:text-neutral-300 cursor-pointer flex items-center"
            >
              ${arrowIcon}
            </button>
          ` : `
            <span class="w-4.5 shrink-0"></span>
          `}

          <!-- Label & Icon -->
          ${node.type === 'directory' ? `
            <button
              data-toggle-path="${node.path}"
              class="tree-toggle-btn flex items-center gap-1.5 text-left cursor-pointer"
            >
              ${folderIcon}
              <span class="truncate">${node.name || 'Project Root'}</span>
            </button>
          ` : `
            <div class="flex items-center gap-1.5 truncate">
              ${getFileIconHTML(node.name)}
              <span class="truncate">${node.name}</span>
            </div>
          `}

          <!-- Target Search Folder Button (directories only) -->
          ${node.type === 'directory' && node.path ? `
            <button
              data-target-path="${node.path}"
              class="tree-target-btn ml-auto opacity-0 group-hover:opacity-100 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 px-1.5 py-0.5 rounded text-[9px] text-neutral-400 hover:text-neutral-200 transition-all font-sans cursor-pointer flex items-center gap-0.5"
              title="Target search inside this folder"
            >
              <i data-lucide="eye" class="w-2.5 h-2.5"></i>
              Target
            </button>
          ` : ''}

          <!-- Match Indicator Badge -->
          ${isMatching ? `
            <span class="ml-auto text-[8px] bg-amber-500 text-neutral-950 px-1 rounded font-sans font-bold select-none">
              MATCH
            </span>
          ` : ''}
        </div>

        <!-- Children container -->
        ${hasChildren && isExpanded ? `
          <div class="border-l border-neutral-850 ml-2.5 mt-0.5 space-y-0.5">
            ${childrenHTML}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Render the whole tree starting from the root
  container.innerHTML = `<div class="-ml-3.5">${renderNodeHTML(rootNode)}</div>`;

  // Attach event listeners to toggle expand/collapse buttons
  container.querySelectorAll('.tree-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = btn.getAttribute('data-toggle-path');
      toggleTreeNode(path);
    });
  });

  // Attach event listeners to target buttons
  container.querySelectorAll('.tree-target-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = btn.getAttribute('data-target-path');
      targetFolderSearch(path);
    });
  });

  lucide.createIcons();
}

function updateCommandSynthesizer() {
  const synthTextEl = document.getElementById('synthesized-command-text');
  if (!synthTextEl) return;

  const { inputDir, pattern, threshold, outputFile, searchFileNamesOnly } = state.searchParams;
  const cleanPattern = pattern ? pattern : '*';
  const namesOnlyArg = searchFileNamesOnly ? '1' : '0';
  
  const cmd = `lsd --search "${inputDir || 'k:\\searchme'}" "${cleanPattern}" ${threshold.toFixed(2)} "${outputFile || 'results.txt'}" ${namesOnlyArg}`;
  synthTextEl.textContent = cmd;
}


// ============================================================================
// 5. CORE ACTIONS (rebuild, search, download, terminal command router)
// ============================================================================

function selectProject(project) {
  state.activeProject = project;
  state.filePaths = project.filePaths;
  
  // Sync search inputDir to project default root
  state.searchParams.inputDir = project.id === 'linux-kernel' ? 'drivers' : 'src';
  
  // Reset expanded nodes, only expand root & first-level folders of this project by default
  const rootNode = buildFileTree(project.filePaths);
  const initialExpanded = { '': true };
  if (rootNode.children) {
    rootNode.children.forEach(child => {
      if (child.type === 'directory') {
        initialExpanded[child.path] = true;
      }
    });
  }
  state.expandedTreeNodes = initialExpanded;

  // Sync inputs
  const inputDirField = document.getElementById('search-input-dir');
  if (inputDirField) inputDirField.value = state.searchParams.inputDir;

  addTerminalLine(`Loaded active index matrix: "${project.name}" (${project.fileCount} paths parsed)`, 'info');

  renderProjectSelectors();
  rebuildIndex();
}

function rebuildIndex(customPaths = null, customName = null) {
  if (state.isIndexing) return;

  state.isIndexing = true;
  
  // Update button UI state
  const reindexBtn = document.getElementById('rebuild-index-btn');
  const rebuildIcon = document.getElementById('rebuild-btn-icon');
  const rebuildText = document.getElementById('rebuild-btn-text');

  if (reindexBtn) reindexBtn.disabled = true;
  if (rebuildIcon) rebuildIcon.classList.add('animate-spin');
  if (rebuildText) rebuildText.textContent = 'Indexing...';

  setTimeout(() => {
    if (customPaths) {
      state.filePaths = customPaths;
      state.activeProject = {
        id: 'custom-project-' + Date.now(),
        name: customName || 'Custom Directory',
        description: customName 
          ? `Dynamically loaded from local folder: ${customName}` 
          : 'User-provided custom file structure.',
        fileCount: customPaths.length,
        icon: 'Database',
        filePaths: customPaths,
      };
      state.searchParams.inputDir = '';
      const inputDirField = document.getElementById('search-input-dir');
      if (inputDirField) inputDirField.value = '';
    }

    // Simulate real-world indexing delay: ~0.15ms per 1000 files
    const indexingDelay = Math.max(0.08, state.filePaths.length * 0.00015 + Math.random() * 0.04);
    state.stats = computeIndexStats(state.activeProject.name, state.filePaths, indexingDelay);

    // Sync elements
    renderProjectSelectors();
    renderStats();
    triggerSearch();
    renderFileTree();

    // Reset button UI state
    state.isIndexing = false;
    if (reindexBtn) reindexBtn.disabled = false;
    if (rebuildIcon) rebuildIcon.classList.remove('animate-spin');
    if (rebuildText) rebuildText.textContent = 'Re-index';
  }, 450); // Simulates delay
}

function triggerSearch() {
  const start = performance.now();
  const searchResults = searchPaths(state.filePaths, state.searchParams);
  const end = performance.now();

  const elapsed = end - start;
  state.lastSearchTimeMs = elapsed;
  state.lastMatchesCount = searchResults.length;
  state.searchResults = searchResults;

  // Render search panel metrics and results
  const latencyBadge = document.getElementById('search-panel-latency-badge');
  const matchesBadge = document.getElementById('search-panel-matches-badge');
  const telemetryBadge = document.getElementById('latency-telemetry-badge');
  const downloadBtn = document.getElementById('write-output-file-btn');

  if (latencyBadge) latencyBadge.textContent = `${elapsed.toFixed(3)} ms`;
  if (matchesBadge) matchesBadge.textContent = searchResults.length.toLocaleString();
  if (telemetryBadge) telemetryBadge.textContent = `${elapsed.toFixed(3)}ms`;

  if (downloadBtn) {
    if (searchResults.length > 0) {
      downloadBtn.classList.remove('hidden');
    } else {
      downloadBtn.classList.add('hidden');
    }
  }

  updateCommandSynthesizer();
  renderSearchResults();
  
  // Re-render tree so highlighted match nodes are updated!
  renderFileTree();
}

function toggleTreeNode(path) {
  state.expandedTreeNodes[path] = !state.expandedTreeNodes[path];
  renderFileTree();
}

function targetFolderSearch(folderPath) {
  state.searchParams.inputDir = folderPath;
  
  const inputDirField = document.getElementById('search-input-dir');
  if (inputDirField) {
    inputDirField.value = folderPath;
  }

  addTerminalLine(`Target directory scoped to: "${folderPath}"`, 'info');
  triggerSearch();
}

function triggerDownload() {
  const { inputDir, pattern, threshold, outputFile, searchFileNamesOnly } = state.searchParams;
  const cleanPattern = pattern ? pattern : '*';
  const namesOnlyArg = searchFileNamesOnly ? '1' : '0';
  const cmd = `lsd --search "${inputDir || 'k:\\searchme'}" "${cleanPattern}" ${threshold.toFixed(2)} "${outputFile || 'results.txt'}" ${namesOnlyArg}`;

  const header = `=======================================================\n` +
                 ` LSD LIQUID SPEED DIRECTORY SEARCH RESULTS             \n` +
                 ` Command: ${cmd}                    \n` +
                 ` Timestamp: ${new Date().toLocaleString()}            \n` +
                 ` Matches Found: ${state.searchResults.length}                      \n` +
                 `=======================================================\n\n` +
                 `SCORE\tSIZE\tPATH\n` +
                 `-----\t----\t----\n`;

  const body = state.searchResults.map(r => {
    const sizeStr = r.size ? (r.size / 1024).toFixed(1) + ' KB' : 'N/A';
    return `${(r.score * 100).toFixed(0)}%\t${sizeStr}\t${r.path}`;
  }).join('\n');

  const blob = new Blob([header + body], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = outputFile || 'results.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  addTerminalLine(`Output results written to client disk file: "${outputFile || 'results.txt'}"`, 'success');
}


// ============================================================================
// 6. TERMINAL EMULATOR CONTROLLER
// ============================================================================

function addTerminalLine(text, type = 'output') {
  const newLine = {
    id: Math.random().toString(36).substring(7),
    type,
    text,
    timestamp: new Date().toLocaleTimeString(),
  };
  state.terminalLines.push(newLine);
  renderTerminalLines();
}

function executeTerminalCommand(input) {
  const trimmedInput = input.trim();
  if (!trimmedInput) return;

  // Log command
  addTerminalLine(`$ ${trimmedInput}`, 'input');

  // History mechanics
  state.terminalHistory = [...state.terminalHistory.filter(h => h !== trimmedInput), trimmedInput];
  state.terminalHistoryIdx = -1;

  // Split args with quote support
  const parts = [];
  let currentPart = '';
  let inQuotes = false;

  for (let i = 0; i < trimmedInput.length; i++) {
    const char = trimmedInput[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ' ' && !inQuotes) {
      if (currentPart) {
        parts.push(currentPart);
        currentPart = '';
      }
    } else {
      currentPart += char;
    }
  }
  if (currentPart) {
    parts.push(currentPart);
  }

  const cmd = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      printTerminalHelp();
      break;
    case 'clear':
      state.terminalLines = [];
      renderTerminalLines();
      break;
    case 'history':
      if (state.terminalHistory.length === 0) {
        addTerminalLine('No command history found.', 'info');
      } else {
        state.terminalHistory.forEach((h, i) => addTerminalLine(` ${i + 1}  ${h}`, 'output'));
      }
      break;
    case 'lsd':
      if (args.length === 0) {
        addTerminalLine('Rebuilding matrix indexes for dynamic files...', 'info');
        rebuildIndex();
        addTerminalLine('Success: LSD Tree structures rebuilt.', 'success');
      } else if (args[0] === '--search') {
        executeLsdSearchTerminal(args.slice(1));
      } else {
        addTerminalLine(`Indexing directory "${args[0]}"...`, 'info');
        rebuildIndex();
        addTerminalLine(`Success: Directory "${args[0]}" indexed. (${state.filePaths.length} paths)`, 'success');
      }
      break;
    case 'lsdlist':
      printTerminalDirectoryTree();
      break;
    case 'lsdsearch':
      executeLsdSearchTerminal(args);
      break;
    default:
      addTerminalLine(`lsd: command not found: "${cmd}". Type 'help' for instructions.`, 'error');
  }
}

function printTerminalHelp() {
  addTerminalLine('Liquid Speed Directory (lsd) CLI Reference:', 'info');
  addTerminalLine('====================================================', 'info');
  addTerminalLine(' lsd                                Rebuild the active index', 'output');
  addTerminalLine(' lsd <dir>                          Index the specified target directory', 'output');
  addTerminalLine(' lsdlist                            Visualizes directory nodes recursively', 'output');
  addTerminalLine(' lsdsearch <dir> <pattern> <threshold> <output_file> <filenames_only>', 'info');
  addTerminalLine('                                    Perform ultra-fast fuzzy query path matching', 'output');
  addTerminalLine('      <dir>             Folder prefix (e.g. "src" or "k:\\searchme")', 'output');
  addTerminalLine('      <pattern>         Glob-like keyword filter (e.g. "*auth*")', 'output');
  addTerminalLine('      <threshold>       Allowed difference (0.0 to 1.0, e.g. "0.25")', 'output');
  addTerminalLine('      <output_file>     Simulated output path (e.g. "results.txt")', 'output');
  addTerminalLine('      <filenames_only>  Filter filenames only? "1" for yes, "0" for full path', 'output');
  addTerminalLine(' clear                              Clear this terminal window', 'output');
  addTerminalLine(' history                            List recent executions', 'output');
  addTerminalLine('====================================================', 'info');
  addTerminalLine('Example: lsdsearch src/components *button* 0.4 out.txt 1', 'success');
}

function executeLsdSearchTerminal(args) {
  const inputDir = args[0] || 'k:\\searchme';
  const pattern = args[1] || '*';
  const threshold = parseFloat(args[2] || '0.5');
  const outputFile = args[3] || 'results.txt';
  const searchFileNamesOnly = args[4] === '1';

  if (isNaN(threshold) || threshold < 0 || threshold > 1) {
    addTerminalLine('Error: threshold must be a decimal value between 0.0 and 1.0.', 'error');
    return;
  }

  addTerminalLine(`Searching directory tree starting from "${inputDir}" matching "${pattern}"...`, 'info');
  
  const params = {
    inputDir,
    pattern,
    threshold,
    outputFile,
    searchFileNamesOnly,
  };

  // Sync to visual sliders!
  state.searchParams = params;
  
  // Update inputs
  const inputDirField = document.getElementById('search-input-dir');
  const patternField = document.getElementById('search-pattern');
  const thresholdSlider = document.getElementById('search-threshold-slider');
  const thresholdBadge = document.getElementById('threshold-value-badge');
  const outputFileField = document.getElementById('search-output-file');
  const toggleIcon = document.getElementById('toggle-icon');

  if (inputDirField) inputDirField.value = inputDir;
  if (patternField) patternField.value = pattern;
  if (thresholdSlider) thresholdSlider.value = threshold;
  if (thresholdBadge) thresholdBadge.textContent = threshold.toFixed(2);
  if (outputFileField) outputFileField.value = outputFile;
  if (toggleIcon) {
    if (searchFileNamesOnly) {
      toggleIcon.setAttribute('data-lucide', 'toggle-right');
      toggleIcon.className = 'w-9 h-9 text-amber-500';
    } else {
      toggleIcon.setAttribute('data-lucide', 'toggle-left');
      toggleIcon.className = 'w-9 h-9 text-neutral-600';
    }
    lucide.createIcons();
  }

  const start = performance.now();
  const results = searchPaths(state.filePaths, params);
  const elapsed = performance.now() - start;

  state.lastSearchTimeMs = elapsed;
  state.lastMatchesCount = results.length;
  state.searchResults = results;

  // Sync other panel elements
  const latencyBadge = document.getElementById('search-panel-latency-badge');
  const matchesBadge = document.getElementById('search-panel-matches-badge');
  const telemetryBadge = document.getElementById('latency-telemetry-badge');
  const downloadBtn = document.getElementById('write-output-file-btn');

  if (latencyBadge) latencyBadge.textContent = `${elapsed.toFixed(3)} ms`;
  if (matchesBadge) matchesBadge.textContent = results.length.toLocaleString();
  if (telemetryBadge) telemetryBadge.textContent = `${elapsed.toFixed(3)}ms`;
  if (downloadBtn) {
    if (results.length > 0) downloadBtn.classList.remove('hidden');
    else downloadBtn.classList.add('hidden');
  }

  updateCommandSynthesizer();
  renderSearchResults();

  if (results.length === 0) {
    addTerminalLine(`No files matched filters (latency: ${elapsed.toFixed(3)}ms)`, 'error');
    return;
  }

  addTerminalLine(`SCORE\tSIZE\tPATH`, 'info');
  addTerminalLine(`-----\t----\t----`, 'info');

  const limit = 15;
  const itemsToShow = results.slice(0, limit);
  
  itemsToShow.forEach(r => {
    const sizeStr = formatBytes(r.size);
    addTerminalLine(`${(r.score * 100).toFixed(0)}%\t${sizeStr}\t${r.path}`, 'output');
  });

  if (results.length > limit) {
    addTerminalLine(`... and ${results.length - limit} other files. (Simulated output written to "${outputFile}")`, 'info');
  }

  addTerminalLine(`Successfully completed in ${elapsed.toFixed(3)}ms. Found ${results.length} files.`, 'success');
}

function printTerminalDirectoryTree() {
  addTerminalLine(`Directory tree of "${state.activeProject.name}"`, 'info');
  addTerminalLine(`.`, 'output');

  const maxLines = 40;
  let printedLines = 0;

  const tree = {};
  const samplePaths = state.filePaths.length > 100 ? state.filePaths.slice(0, 50) : state.filePaths;

  samplePaths.forEach(p => {
    const parts = p.split('/');
    let cur = tree;
    parts.forEach(part => {
      if (!cur[part]) cur[part] = {};
      cur = cur[part];
    });
  });

  function printNode(node, prefix, isLast) {
    if (printedLines >= maxLines) return;

    const keys = Object.keys(node);
    keys.forEach((key, index) => {
      if (printedLines >= maxLines) return;
      
      const lastChild = index === keys.length - 1;
      const connector = lastChild ? '└── ' : '├── ';
      addTerminalLine(`${prefix}${connector}${key}`, 'output');
      printedLines++;

      const childNode = node[key];
      if (Object.keys(childNode).length > 0) {
        printNode(childNode, prefix + (lastChild ? '    ' : '│   '), lastChild);
      }
    });
  }

  printNode(tree, '', true);

  if (state.filePaths.length > 50) {
    addTerminalLine(`│`, 'output');
    addTerminalLine(`└── ... (${state.filePaths.length - printedLines} more files nested in index)`, 'info');
  }
}


// ============================================================================
// 7. EVENT LISTENERS & MODALS
// ============================================================================

function initEventListeners() {
  // Input Dir listener
  const inputDirField = document.getElementById('search-input-dir');
  if (inputDirField) {
    inputDirField.value = state.searchParams.inputDir;
    inputDirField.addEventListener('input', (e) => {
      state.searchParams.inputDir = e.target.value;
      triggerSearch();
    });
  }

  // Search Pattern listener
  const patternField = document.getElementById('search-pattern');
  if (patternField) {
    patternField.value = state.searchParams.pattern;
    patternField.addEventListener('input', (e) => {
      state.searchParams.pattern = e.target.value;
      triggerSearch();
    });
  }

  // Threshold Slider listener
  const thresholdSlider = document.getElementById('search-threshold-slider');
  const thresholdBadge = document.getElementById('threshold-value-badge');
  if (thresholdSlider) {
    thresholdSlider.value = state.searchParams.threshold;
    thresholdSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.searchParams.threshold = val;
      if (thresholdBadge) thresholdBadge.textContent = val.toFixed(2);
      triggerSearch();
    });
  }

  // Output File listener
  const outputFileField = document.getElementById('search-output-file');
  if (outputFileField) {
    outputFileField.value = state.searchParams.outputFile;
    outputFileField.addEventListener('input', (e) => {
      state.searchParams.outputFile = e.target.value;
      updateCommandSynthesizer();
    });
  }

  // Search Filenames Only listener
  const toggleBtn = document.getElementById('search-filenames-only-toggle');
  const toggleIcon = document.getElementById('toggle-icon');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      state.searchParams.searchFileNamesOnly = !state.searchParams.searchFileNamesOnly;
      if (toggleIcon) {
        if (state.searchParams.searchFileNamesOnly) {
          toggleIcon.setAttribute('data-lucide', 'toggle-right');
          toggleIcon.className = 'w-9 h-9 text-amber-500';
        } else {
          toggleIcon.setAttribute('data-lucide', 'toggle-left');
          toggleIcon.className = 'w-9 h-9 text-neutral-600';
        }
        lucide.createIcons();
      }
      triggerSearch();
    });
  }

  // Copy CMD buttons
  const copyBtn = document.getElementById('copy-cmd-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyBtnIcon = document.getElementById('copy-btn-icon');
  const copyInnerBtn = document.getElementById('copy-cmd-inner-btn');

  function copyCMD() {
    const { inputDir, pattern, threshold, outputFile, searchFileNamesOnly } = state.searchParams;
    const cleanPattern = pattern ? pattern : '*';
    const namesOnlyArg = searchFileNamesOnly ? '1' : '0';
    const cmd = `lsd --search "${inputDir || 'k:\\searchme'}" "${cleanPattern}" ${threshold.toFixed(2)} "${outputFile || 'results.txt'}" ${namesOnlyArg}`;
    
    navigator.clipboard.writeText(cmd);
    
    // Animate badge
    if (copyBtnText && copyBtnIcon) {
      const oldText = copyBtnText.textContent;
      copyBtnText.textContent = 'Copied!';
      copyBtnText.className = 'text-[10px] text-emerald-400';
      copyBtnIcon.setAttribute('data-lucide', 'check');
      copyBtnIcon.className = 'w-3.5 h-3.5 text-emerald-500';
      lucide.createIcons();

      setTimeout(() => {
        copyBtnText.textContent = oldText;
        copyBtnText.className = 'text-[10px]';
        copyBtnIcon.setAttribute('data-lucide', 'copy');
        copyBtnIcon.className = 'w-3.5 h-3.5 text-neutral-500 hover:text-neutral-400';
        lucide.createIcons();
      }, 2000);
    }
  }

  if (copyBtn) copyBtn.addEventListener('click', copyCMD);
  if (copyInnerBtn) copyInnerBtn.addEventListener('click', copyCMD);

  // Write file output button click
  const downloadBtn = document.getElementById('write-output-file-btn');
  if (downloadBtn) downloadBtn.addEventListener('click', triggerDownload);

  // Rebuild Index button
  const rebuildBtn = document.getElementById('rebuild-index-btn');
  if (rebuildBtn) {
    rebuildBtn.addEventListener('click', () => {
      addTerminalLine('Manually triggered re-index sequence...', 'info');
      rebuildIndex();
    });
  }

  // Terminal click focus input
  const terminalWrapper = document.getElementById('terminal-wrapper');
  const terminalInput = document.getElementById('terminal-input');
  if (terminalWrapper && terminalInput) {
    terminalWrapper.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // Terminal command inputs (Enter, Arrows, Tab)
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        if (val) {
          executeTerminalCommand(val);
          terminalInput.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.terminalHistory.length === 0) return;
        const nextIdx = state.terminalHistoryIdx < state.terminalHistory.length - 1 
          ? state.terminalHistoryIdx + 1 
          : state.terminalHistoryIdx;
        state.terminalHistoryIdx = nextIdx;
        terminalInput.value = state.terminalHistory[state.terminalHistory.length - 1 - nextIdx];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.terminalHistoryIdx <= 0) {
          state.terminalHistoryIdx = -1;
          terminalInput.value = '';
        } else {
          const nextIdx = state.terminalHistoryIdx - 1;
          state.terminalHistoryIdx = nextIdx;
          terminalInput.value = state.terminalHistory[state.terminalHistory.length - 1 - nextIdx];
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const curVal = terminalInput.value.toLowerCase().trim();
        const cmds = ['help', 'clear', 'lsd', 'lsdlist', 'lsdsearch', 'history'];
        const matched = cmds.find(c => c.startsWith(curVal) && c !== curVal);
        if (matched) {
          terminalInput.value = matched;
        }
      }
    });
  }

  // Clear Terminal button
  const clearTerminalBtn = document.getElementById('clear-terminal-btn');
  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.terminalLines = [];
      renderTerminalLines();
    });
  }

  // Tree local search filter input
  const treeFilterInput = document.getElementById('tree-filter-input');
  const clearTreeFilterBtn = document.getElementById('clear-tree-filter-btn');
  if (treeFilterInput) {
    treeFilterInput.addEventListener('input', (e) => {
      const val = e.target.value;
      state.treeSearchTerm = val;
      if (clearTreeFilterBtn) {
        if (val) clearTreeFilterBtn.classList.remove('hidden');
        else clearTreeFilterBtn.classList.add('hidden');
      }
      renderFileTree();
    });
  }
  if (clearTreeFilterBtn) {
    clearTreeFilterBtn.addEventListener('click', () => {
      state.treeSearchTerm = '';
      if (treeFilterInput) treeFilterInput.value = '';
      clearTreeFilterBtn.classList.add('hidden');
      renderFileTree();
    });
  }

  // Custom paths modal toggles
  const customIndexBtn = document.getElementById('custom-index-btn');
  const customModal = document.getElementById('custom-paths-modal');
  const closeCustomModalBtnTop = document.getElementById('close-custom-modal-btn-top');
  const closeCustomModalBtnBottom = document.getElementById('close-custom-modal-btn-bottom');
  const textarea = document.getElementById('custom-paths-textarea');
  const counter = document.getElementById('custom-paths-counter');
  const resetBtn = document.getElementById('reset-custom-paths-btn');
  const submitCustomPathsBtn = document.getElementById('submit-custom-paths-btn');

  if (customIndexBtn && customModal) {
    customIndexBtn.addEventListener('click', () => {
      customModal.classList.remove('hidden');
      if (textarea) {
        textarea.value = DEFAULT_CUSTOM_PATHS.join('\n');
        updatePathsCounter();
        textarea.focus();
      }
    });
  }

  function hideCustomModal() {
    if (customModal) customModal.classList.add('hidden');
  }

  if (closeCustomModalBtnTop) closeCustomModalBtnTop.addEventListener('click', hideCustomModal);
  if (closeCustomModalBtnBottom) closeCustomModalBtnBottom.addEventListener('click', hideCustomModal);

  function updatePathsCounter() {
    if (textarea && counter) {
      const paths = textarea.value.split('\n').map(p => p.trim()).filter(p => p.length > 0);
      counter.textContent = paths.length;
    }
  }

  if (textarea) {
    textarea.addEventListener('input', updatePathsCounter);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (textarea) {
        textarea.value = DEFAULT_CUSTOM_PATHS.join('\n');
        updatePathsCounter();
      }
    });
  }

  if (submitCustomPathsBtn) {
    submitCustomPathsBtn.addEventListener('click', () => {
      if (textarea) {
        const paths = textarea.value.split('\n').map(p => p.trim()).filter(p => p.length > 0);
        if (paths.length > 0) {
          addTerminalLine(`Index sequence triggered for ${paths.length} custom raw paths...`, 'info');
          rebuildIndex(paths);
          hideCustomModal();
        }
      }
    });
  }

  // Pick Directory Button (Using Native web API showDirectoryPicker)
  const pickFolderBtn = document.getElementById('pick-directory-btn');
  const pickerErrorContainer = document.getElementById('picker-error-container');
  const pickerErrorText = document.getElementById('picker-error-text');
  const closePickerErrorBtn = document.getElementById('close-picker-error-btn');

  if (pickFolderBtn) {
    pickFolderBtn.addEventListener('click', async () => {
      if (pickerErrorContainer) pickerErrorContainer.classList.add('hidden');

      if (!('showDirectoryPicker' in window)) {
        showPickerError("The directory picker is not supported in this browser. Please try Google Chrome or Microsoft Edge.");
        return;
      }

      try {
        const dirHandle = await window.showDirectoryPicker();
        addTerminalLine(`Selected folder "${dirHandle.name}". Parsing file trees recursively...`, 'info');
        
        const paths = [];
        async function traverse(handle, currentPath) {
          for await (const entry of handle.values()) {
            const relativePath = currentPath ? `${currentPath}/${entry.name}` : entry.name;
            if (entry.kind === 'file') {
              paths.push(relativePath);
            } else if (entry.kind === 'directory') {
              await traverse(entry, relativePath);
            }
          }
        }

        await traverse(dirHandle, '');

        if (paths.length === 0) {
          showPickerError("Selected directory is empty or could not be accessed.");
          return;
        }

        addTerminalLine(`Found ${paths.length} nodes inside folder. Commencing matrix compile...`, 'success');
        rebuildIndex(paths, dirHandle.name);
      } catch (err) {
        console.error(err);
        if (err.name === 'SecurityError') {
          showPickerError("Security block: If iframe blocks the picker, try opening the page in a separate tab!");
        } else if (err.name !== 'AbortError') {
          showPickerError(`Failed to read folder: ${err.message || err}`);
        }
      }
    });
  }

  function showPickerError(msg) {
    if (pickerErrorContainer && pickerErrorText) {
      pickerErrorText.textContent = msg;
      pickerErrorContainer.classList.remove('hidden');
    }
    addTerminalLine(`Picker warning: ${msg}`, 'error');
  }

  if (closePickerErrorBtn) {
    closePickerErrorBtn.addEventListener('click', () => {
      if (pickerErrorContainer) pickerErrorContainer.classList.add('hidden');
    });
  }
}

// Format bytes to human readable format
function formatBytes(bytes) {
  if (!bytes) return 'N/A';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}


// ============================================================================
// 8. INITIALIZATION
// ============================================================================

function initApp() {
  // Set up welcome logs in terminal
  state.terminalLines = [
    {
      id: 'welcome',
      type: 'info',
      text: `LSD (Liquid Speed Directory) Console [v2.4.0]`,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 'welcome-hint',
      type: 'info',
      text: `Type 'help' to view the command signatures. Active index: "${state.activeProject.name}"`,
      timestamp: new Date().toLocaleTimeString(),
    }
  ];

  // Set up initial statistics
  const indexingDelay = Math.max(0.08, state.filePaths.length * 0.00015 + Math.random() * 0.04);
  state.stats = computeIndexStats(state.activeProject.name, state.filePaths, indexingDelay);

  // Render everything
  renderProjectSelectors();
  renderStats();
  renderTerminalLines();
  triggerSearch();
  renderFileTree();
  updateCommandSynthesizer();

  // Attach event handlers
  initEventListeners();

  lucide.createIcons();
}

// Run init when window loads
window.addEventListener('DOMContentLoaded', initApp);
