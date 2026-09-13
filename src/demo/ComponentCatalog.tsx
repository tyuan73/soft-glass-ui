import React, { useState } from 'react';
import { CopyButton } from './CopyButton';
import {
  SoftCard,
  SoftButton,
  SoftSwitch,
  SoftSlider,
  SoftProgressBar,
  SoftAvatar,
  SoftChip,
  SoftInput,
  SoftCheckbox,
  SoftRadio,
  SoftTabs,
  SoftImage,
  SoftAccordion,
  SoftSidebar,
  SoftMarkdownViewer,
  SoftDialog,
  SoftBreadcrumbs,
  SoftTabsContent,
  SoftPopupMenu,
  SoftRow,
  SoftColumn,
  SoftDivider,
  Text,
  SoftImageGallery,
  SoftPDFViewer,
  SoftAudioPlayer,
  SoftVideoPlayer,
  SoftDateTimePicker,
  useToast,
} from '../components/soft-ui';
import {
  Search,
  Heart,
  Settings,
  Bell,
  Play,
  Mail,
  User,
  Sparkles,
  Home,
  FileText,
  HelpCircle,
  Shield,
  Trash2,
  Share2,
  ExternalLink,
  SlidersHorizontal,
  Code,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Folder,
  TrendingUp,
  Activity,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Hash,
  Moon,
  Type,
  Images,
  FileCheck,
  Music,
  Video,
} from 'lucide-react';

const SAMPLE_MARKDOWN = `# Classic Soft Design System

A modern **Neumorphic** React component system that balances *raised* and *pressed* surfaces using realistic lighting simulation.

## Core Principles
- **Dual-Shadow Equation**: specular highlights combined with soft ambient absorption.
- **Physical Feedback**: buttons depress smoothly into the surface on touch.

## Mathematical Model (LaTeX)
Optical surface normals and twin-light vectors at angle $\\theta = -135^\\circ$:

$$
\\mathbf{I}_{\\text{soft}} = k_a \\mathbf{I}_a + \\sum_{i=1}^2 k_d (\\mathbf{L}_i \\cdot \\mathbf{N}) + k_s (\\mathbf{R}_i \\cdot \\mathbf{V})^n
$$

Euler's identity: $e^{i\\pi} + 1 = 0$ and Gaussian blur kernel:

$$
G(x, y) = \\frac{1}{2\\pi\\sigma^2} e^{-\\frac{x^2 + y^2}{2\\sigma^2}}
$$

### Quick Example
\`\`\`tsx
import { SoftButton, SoftCard } from './components/soft-ui';

export function QuickStart() {
  return (
    <SoftCard title="HELLO WORLD">
      <SoftButton variant="accent">Click Me</SoftButton>
    </SoftCard>
  );
}
\`\`\`

### Syntax Highlighting Examples

\`\`\`typescript
// 1. TypeScript
interface SurfaceLighting {
  angle: number;
  specularRatio: number;
  render: (canvas: HTMLElement) => Promise<boolean>;
}

export const applySoftLighting = async (config: SurfaceLighting): Promise<void> => {
  const { angle, specularRatio } = config;
  console.log("Calculating twin-light normals at " + angle + " deg with ratio " + specularRatio);
};
\`\`\`

\`\`\`python
# 2. Python
import math
from dataclasses import dataclass

@dataclass
class DualShadowEquation:
    ambient: float = 0.25
    specular: float = 0.85
    light_angle_deg: float = -135.0

    def compute_intensity(self, normal_vector: tuple[float, float]) -> float:
        rad = math.radians(self.light_angle_deg)
        light = (math.cos(rad), math.sin(rad))
        dot_product = normal_vector[0] * light[0] + normal_vector[1] * light[1]
        return max(0.0, self.ambient + self.specular * dot_product)
\`\`\`

\`\`\`java
// 3. Java
package com.softui.theme;

public class ShadowEquation {
    private final double inclinationAngle;
    private final boolean isPressed;

    public ShadowEquation(double angle, boolean pressed) {
        this.inclinationAngle = angle;
        this.isPressed = pressed;
    }

    public String generateBoxShadowToken() {
        return this.isPressed 
            ? "inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.7)"
            : "8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.85)";
    }
}
\`\`\`

\`\`\`sql
-- 4. SQL
SELECT 
    u.id, 
    u.username, 
    t.theme_name,
    COUNT(c.id) AS components_used
FROM users u
INNER JOIN user_preferences up ON u.id = up.user_id
INNER JOIN themes t ON up.theme_id = t.id
LEFT JOIN components c ON c.user_id = u.id
WHERE up.active_preset = 'classic_gray'
GROUP BY u.id, u.username, t.theme_name
HAVING COUNT(c.id) > 5
ORDER BY components_used DESC;
\`\`\`

\`\`\`shell
# 5. Shell / Bash
#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Deploying Classic Soft UI components..."
npm install
npm run lint
npm run build

echo "✅ Build verified successfully! Previewing dist bundle..."
npx vite preview --port 3000
\`\`\`

\`\`\`html
<!-- 6. HTML -->
<section class="soft-card soft-raised-md" data-theme="classic">
  <div class="header">
    <h2 class="title">Tactile Audio Deck</h2>
    <span class="badge">Live</span>
  </div>
  <button type="button" class="soft-btn soft-accent" id="playBtn">
    Play Track
  </button>
</section>
\`\`\`

\`\`\`css
/* 7. CSS */
.soft-surface {
  background: var(--soft-surface);
  border-radius: 1.5rem;
  transition: box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.soft-raised-md {
  box-shadow: 
    7px 7px 14px rgba(163, 177, 198, 0.6),
    -7px -7px 14px rgba(255, 255, 255, 0.9);
}

.soft-surface:active {
  box-shadow: 
    inset 4px 4px 8px rgba(163, 177, 198, 0.65),
    inset -4px -4px 8px rgba(255, 255, 255, 0.85);
}
\`\`\`

\`\`\`javascript
// 8. JavaScript
function initializeSoftAudioEngine(trackList = []) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let currentTrackIndex = 0;

  return {
    play: () => audioContext.resume().then(() => console.log("Playing: " + trackList[currentTrackIndex])),
    next: () => {
      currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
      console.log("Track changed to index " + currentTrackIndex);
    }
  };
}
\`\`\`

> "Good design makes a product understandable. Soft UI makes digital surfaces feel tactile and human."

| Component | Variant | Status |
| :--- | :--- | :--- |
| SoftButton | Raised, Pressed, Accent | Production |
| SoftDialog | Light-Dismiss Native | Ready |
| SoftToast | Stacked Auto-Dismiss | Active |
| SoftAudioPlayer | Vinyl Turntable, Minimized | Production |
| SoftVideoPlayer | 4K HDR, Speed Controls | Production |

---
Feel free to copy the components directly into your own applications!
`;

const SAMPLE_GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    title: 'Architectural Fluid Curves',
    description:
      'Minimalist continuous plastic surface geometries reflecting ambient light vectors at 135 degrees.',
    category: 'Architecture',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    title: 'Clay Morphology & Shadows',
    description:
      'Sculptural organic silhouettes showcasing dual soft specular highlights and debossed cavities.',
    category: 'Sculpture',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Serene Coastal Horizon',
    description:
      'Calm ambient sand dunes with pristine natural color gradients and tactile ripples.',
    category: 'Landscape',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Minimalist Interior Haven',
    description: 'Soft daylight diffusion across matte concrete and tactile wooden fixtures.',
    category: 'Interior',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    title: 'Geometric Studio Study',
    description: 'Clean spatial rhythm, neutral gray substrate, and balanced specular reflections.',
    category: 'Studio',
  },
];

export const ComponentCatalog: React.FC = () => {
  const toast = useToast();

  // State for demos
  const [btnActive, setBtnActive] = useState(false);
  const [accentCount, setAccentCount] = useState(0);
  const [toggleVal, setToggleVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(72);
  const [progressVal, setProgressVal] = useState(45);
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [emailVal, setEmailVal] = useState('alex.morgan@example.com');
  const [passwordVal, setPasswordVal] = useState('SecretP@ssw0rd!');
  const [showPassword, setShowPassword] = useState(false);
  const [telVal, setTelVal] = useState('+1 (555) 234-5678');
  const [numberVal, setNumberVal] = useState(24);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [radioVal, setRadioVal] = useState('opt1');
  const [activeTab, setActiveTab] = useState('all');

  // State for modal & navigation demos
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidebarActive, setSidebarActive] = useState('dashboard');
  const [activeBreadcrumb, setActiveBreadcrumb] = useState('components');
  const [selectedChips, setSelectedChips] = useState<string[]>(['Design', 'Code']);

  // State for DateTimePicker demos
  const [demoDateTime, setDemoDateTime] = useState<Date | null>(new Date());
  const [demoDateOnly, setDemoDateOnly] = useState<Date | null>(new Date());
  const [demoTimeOnly, setDemoTimeOnly] = useState<Date | null>(new Date());
  const [demoInlineDate, setDemoInlineDate] = useState<Date | null>(new Date());

  const handleChipToggle = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Intro Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-pressed-xs mb-3 text-xs font-bold text-[var(--soft-primary)] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 22 Building Blocks
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--soft-text)]">
          Component Catalog
        </h2>
        <p className="mt-2 text-sm text-[var(--soft-text-muted)]">
          Primitive building blocks that form the visual foundation of Classic Soft UI. Fully
          accessible, typed with TypeScript, and reactive to touch and pointer physics.
        </p>
      </div>

      <div className="space-y-16">
        {/* 8. ROW & COLUMN GRID */}
        <section id="layout-grid" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Row & Column Layout (`SoftRow` & `SoftColumn`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                12-column responsive layout system with tactile soft surfaces (raised / pressed),
                flexible gaps, and alignment options
              </p>
            </div>
            <CopyButton
              code={`<SoftRow gap="md">\n  <SoftColumn span={4} surface="raised">Col 4</SoftColumn>\n  <SoftColumn span={8} surface="pressed">Col 8</SoftColumn>\n</SoftRow>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                12-Column Proportional Spans
              </span>
              <div className="space-y-3">
                <SoftRow gap="sm">
                  <SoftColumn
                    span={12}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-bold text-[var(--soft-primary)]"
                  >
                    span 12 (Full Width)
                  </SoftColumn>
                </SoftRow>

                <SoftRow gap="sm">
                  <SoftColumn
                    span={6}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 6 (50%)
                  </SoftColumn>
                  <SoftColumn
                    span={6}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 6 (50%)
                  </SoftColumn>
                </SoftRow>

                <SoftRow gap="sm">
                  <SoftColumn
                    span={4}
                    surface="pressed"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text-muted)]"
                  >
                    span 4 (1/3)
                  </SoftColumn>
                  <SoftColumn
                    span={8}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 8 (2/3)
                  </SoftColumn>
                </SoftRow>

                <SoftRow gap="sm">
                  <SoftColumn
                    span={3}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 3 (25%)
                  </SoftColumn>
                  <SoftColumn
                    span={3}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 3 (25%)
                  </SoftColumn>
                  <SoftColumn
                    span={3}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 3 (25%)
                  </SoftColumn>
                  <SoftColumn
                    span={3}
                    surface="raised"
                    className="text-center py-2.5 text-xs font-semibold text-[var(--soft-text)]"
                  >
                    span 3 (25%)
                  </SoftColumn>
                </SoftRow>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 2. CARDS & SURFACES */}
        <section id="cards" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Cards & Surfaces (`SoftCard`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Light physics surfaces: Raised (levels xs to xl), Pressed/Inset, Convex & Concave
                gradients
              </p>
            </div>
            <CopyButton
              code={`<SoftCard elevation="md" rounded="2xl" title="CARD TITLE">\n  Content...\n</SoftCard>`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SoftCard elevation="sm" rounded="2xl" title="ELEVATION SM">
              <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                Subtle raised shadow for compact cards and menu items.
              </p>
            </SoftCard>

            <SoftCard elevation="md" rounded="2xl" title="ELEVATION MD">
              <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                Standard elevation used in the Classic Soft design system.
              </p>
            </SoftCard>

            <SoftCard variant="pressed" rounded="2xl" title="PRESSED / INSET">
              <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                Sunken surface with dual inner shadows. Perfect for well containers.
              </p>
            </SoftCard>

            <SoftCard variant="convex" rounded="2xl" title="CONVEX CURVATURE">
              <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                Subtle 3D spherical gradient highlight across the surface.
              </p>
            </SoftCard>
          </div>
        </section>

        {/* 9. DIVIDERS */}
        <section id="divider" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Dividers (`SoftDivider`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Dual-line light/shadow separators that mimic etched physical grooves in horizontal
                and vertical directions
              </p>
            </div>
            <CopyButton
              code={`// Horizontal\n<SoftDivider variant="bevel" label="SECTION" />\n// Vertical\n<SoftDivider orientation="vertical" variant="bevel" className="h-8" />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-8">
            {/* Horizontal Dividers */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
                Horizontal Variants
              </span>
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-[var(--soft-text-muted)] block mb-1">
                    Inset (Sunken debossed groove)
                  </span>
                  <SoftDivider variant="inset" />
                </div>
                <div>
                  <span className="text-xs text-[var(--soft-text-muted)] block mb-1">
                    Raised (Embossed raised peak)
                  </span>
                  <SoftDivider variant="raised" />
                </div>
                <div>
                  <span className="text-xs text-[var(--soft-text-muted)] block mb-1">
                    Bevel with Label
                  </span>
                  <SoftDivider variant="bevel" label="SECTION SEPARATOR" />
                </div>
              </div>
            </div>

            {/* Vertical Dividers */}
            <div className="space-y-4 pt-4 border-t border-[var(--soft-text-subtle)]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
                Vertical Variants (`orientation=&quot;vertical&quot;`)
              </span>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Vertical dividers inherit height from their flex container (
                <code className="text-[var(--soft-primary)]">self-stretch</code>) or explicit height
                classes.
              </p>

              {/* Example 1: Action Toolbar with Vertical Dividers */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[var(--soft-text-subtle)]">
                  Action Toolbar Example (Separating Button Groups)
                </span>
                <div className="p-3 rounded-2xl soft-surface soft-pressed-xs inline-flex items-center gap-1">
                  <SoftButton size="sm" variant="raised">
                    Cut
                  </SoftButton>
                  <SoftButton size="sm" variant="raised">
                    Copy
                  </SoftButton>
                  <SoftButton size="sm" variant="raised">
                    Paste
                  </SoftButton>

                  <SoftDivider orientation="vertical" variant="bevel" className="h-6 mx-2" />

                  <SoftButton size="sm" variant="raised">
                    Bold
                  </SoftButton>
                  <SoftButton size="sm" variant="raised">
                    Italic
                  </SoftButton>

                  <SoftDivider orientation="vertical" variant="bevel" className="h-6 mx-2" />

                  <SoftButton size="sm" variant="accent">
                    Export
                  </SoftButton>
                </div>
              </div>

              {/* Example 2: KPI Metrics Bar with Inset Vertical Dividers */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[var(--soft-text-subtle)]">
                  KPI Metric Bar Example (`variant=&quot;inset&quot;`)
                </span>
                <div className="p-4 rounded-2xl soft-surface soft-raised-sm flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--soft-text-muted)] mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Total Users
                    </div>
                    <div className="text-lg font-bold text-[var(--soft-text)]">24,890</div>
                  </div>

                  <SoftDivider orientation="vertical" variant="inset" className="h-10" />

                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--soft-text-muted)] mb-1">
                      <Activity className="w-3.5 h-3.5 text-[var(--soft-primary)]" /> Conversion
                    </div>
                    <div className="text-lg font-bold text-[var(--soft-text)]">4.82%</div>
                  </div>

                  <SoftDivider orientation="vertical" variant="inset" className="h-10" />

                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--soft-text-muted)] mb-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Avg Latency
                    </div>
                    <div className="text-lg font-bold text-[var(--soft-text)]">38 ms</div>
                  </div>
                </div>
              </div>

              {/* Example 3: Side-by-side vertical style variations */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[var(--soft-text-subtle)]">
                  All Vertical Styles Comparison
                </span>
                <div className="p-4 rounded-2xl soft-surface soft-pressed-xs flex items-center justify-around h-16 text-xs text-[var(--soft-text-muted)] font-medium">
                  <span>Bevel</span>
                  <SoftDivider orientation="vertical" variant="bevel" className="h-10" />
                  <span>Inset</span>
                  <SoftDivider orientation="vertical" variant="inset" className="h-10" />
                  <span>Raised</span>
                  <SoftDivider orientation="vertical" variant="raised" className="h-10" />
                  <span>Dashed</span>
                  <SoftDivider orientation="vertical" variant="dashed" className="h-10" />
                  <span>Plain</span>
                  <SoftDivider orientation="vertical" variant="plain" className="h-10" />
                  <span>End</span>
                </div>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 13. LEFT NAV (SIDEBAR) */}
        <section id="left-nav" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Left Nav (`SoftSidebar`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Collapsible sidebar navigation with sectional groupings, badges, and tactile pressed
                states
              </p>
            </div>
            <CopyButton
              code={`<SoftSidebar items={navItems} collapsible={true} onSelect={(id) => setActive(id)} />`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 lg:col-span-4 h-[650px]">
              <SoftSidebar
                brandName="Classic Soft"
                activeId={sidebarActive}
                onSelect={(id) => {
                  setSidebarActive(id);
                  toast.info(`Switched to ${id} section`);
                }}
                items={[
                  {
                    id: 'dashboard',
                    label: 'Dashboard',
                    icon: <Layers className="w-4 h-4" />,
                    section: 'MAIN',
                  },
                  {
                    id: 'projects',
                    label: 'Projects',
                    icon: <Folder className="w-4 h-4" />,
                    badge: 3,
                    section: 'MAIN',
                  },
                  {
                    id: 'docs',
                    label: 'Documentation',
                    icon: <FileText className="w-4 h-4" />,
                    section: 'RESOURCES',
                  },
                  {
                    id: 'security',
                    label: 'Security',
                    icon: <Shield className="w-4 h-4" />,
                    section: 'SETTINGS',
                  },
                  {
                    id: 'help',
                    label: 'Help & FAQ',
                    icon: <HelpCircle className="w-4 h-4" />,
                    section: 'SETTINGS',
                  },
                ]}
              />
            </div>

            <div className="md:col-span-7 lg:col-span-8">
              <SoftCard
                elevation="md"
                rounded="3xl"
                title="ACTIVE VIEW PREVIEW"
                className="h-[650px] flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-[var(--soft-text)] capitalize">
                    {sidebarActive} Section
                  </h4>
                  <p className="text-xs text-[var(--soft-text-muted)] mt-1">
                    Try collapsing and expanding the sidebar using the arrow button at the top-right
                    of the left nav bar!
                  </p>
                  <div className="mt-6 p-4 rounded-2xl soft-surface soft-pressed-xs space-y-2">
                    <span className="text-xs font-bold text-[var(--soft-primary)] uppercase">
                      Active State Details
                    </span>
                    <p className="text-xs text-[var(--soft-text-muted)]">
                      The active navigation item smoothly insets into the surface with dual shadows
                      (<code className="text-[var(--soft-primary)] font-mono">soft-pressed-sm</code>
                      ) and a bold accent color.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-xs text-[var(--soft-text-subtle)]">
                    SoftSidebar Component
                  </span>
                  <SoftButton
                    size="sm"
                    onClick={() => toast.success('Sidebar link action clicked')}
                  >
                    Action
                  </SoftButton>
                </div>
              </SoftCard>
            </div>
          </div>
        </section>

        {/* 14. BREADCRUMBS */}
        <section id="breadcrumbs" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Breadcrumbs (`SoftBreadcrumbs`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Navigational path trails with interactive links, icons, and active segment styling
              </p>
            </div>
            <CopyButton
              code={`<SoftBreadcrumbs items={[\n  { id: 'home', label: 'Home', icon: <Home /> },\n  { id: 'projects', label: 'Projects' },\n  { id: 'current', label: 'Details', current: true }\n]} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
              Breadcrumb Trail Hierarchy
            </span>
            <div className="flex flex-wrap items-center gap-4 py-2">
              <SoftBreadcrumbs
                items={[
                  {
                    id: 'home',
                    label: 'Home',
                    icon: <Home className="w-3.5 h-3.5" />,
                    onClick: () => setActiveBreadcrumb('home'),
                  },
                  {
                    id: 'workspace',
                    label: 'Projects',
                    onClick: () => setActiveBreadcrumb('workspace'),
                  },
                  {
                    id: 'components',
                    label: 'Classic Soft UI',
                    current: activeBreadcrumb === 'components',
                  },
                ]}
              />
            </div>
          </SoftCard>
        </section>

        {/* 15. TABS */}
        <section id="tabs" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Tabs (`SoftTabs` & `SoftTabsContent`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Segmented tab switchers with animated pill indicator and dynamic panel content
                rendering
              </p>
            </div>
            <CopyButton
              code={`<SoftTabs tabs={tabs} activeTab={active} onChange={setActive} />\n<SoftTabsContent tabs={tabsWithContent} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Segmented Tabs Control
              </span>
              <SoftTabs
                tabs={[
                  { id: 'all', label: 'All Components' },
                  { id: 'forms', label: 'Forms' },
                  { id: 'surfaces', label: 'Surfaces' },
                  { id: 'media', label: 'Media' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Tabs with Dynamic Panels (`SoftTabsContent`)
              </span>
              <SoftTabsContent
                tabs={[
                  {
                    id: 'overview',
                    label: 'Overview',
                    icon: <Layers className="w-4 h-4" />,
                    content: (
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm text-[var(--soft-text)]">
                          Neumorphic Architecture
                        </h4>
                        <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                          Soft UI connects visual forms directly to the background material. Rather
                          than floating layers, elements are pressed or extruded out of a continuous
                          plastic canvas.
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: 'tokens',
                    label: 'Tokens',
                    badge: 'v4',
                    icon: <Code className="w-4 h-4" />,
                    content: (
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm text-[var(--soft-text)]">
                          CSS Custom Properties
                        </h4>
                        <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                          Tokens use twin light vectors at 135-degree inclination. Check{' '}
                          <code className="text-[var(--soft-primary)]">soft-tokens.css</code> for
                          full configuration.
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: 'accessibility',
                    label: 'A11y',
                    icon: <Shield className="w-4 h-4" />,
                    content: (
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm text-[var(--soft-text)]">
                          Accessible Focus States
                        </h4>
                        <p className="text-xs text-[var(--soft-text-muted)] leading-relaxed">
                          Every component includes high-contrast focus rings and keyboard traversal
                          for standard accessibility compliance.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </SoftCard>
        </section>

        {/* 16. ACCORDION */}
        <section id="accordion" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Accordion (`SoftAccordion`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Collapsible cards with smooth expand/collapse transitions, badges, and custom icons
              </p>
            </div>
            <CopyButton code={`<SoftAccordion items={items} multiple={false} />`} />
          </div>

          <SoftCard elevation="md" rounded="2xl">
            <SoftAccordion
              multiple={false}
              items={[
                {
                  id: 'acc1',
                  title: 'What makes Classic Soft unique?',
                  subtitle: 'Dual shadow physics and neutral gray substrate',
                  badge: 'Design',
                  icon: <Sparkles className="w-4 h-4" />,
                  content:
                    'Classic Soft avoids harsh borders and heavy drop shadows. Instead, it relies on monochromatic background shades where positive and negative bevels indicate clickable and sunken states.',
                },
                {
                  id: 'acc2',
                  title: 'How do raised vs pressed states work?',
                  subtitle: 'Interactive tactile feedback',
                  badge: 'Physics',
                  icon: <SlidersHorizontal className="w-4 h-4" />,
                  content:
                    'Raised surfaces cast outward dual shadows (light on top-left, shadow on bottom-right). When clicked or active, the element transitions to inset shadows, simulating physical depression into the surface.',
                },
                {
                  id: 'acc3',
                  title: 'Can I customize the color themes?',
                  subtitle: 'Classic Gray, Dark Slate, Warm Cream, Lavender',
                  badge: 'Themes',
                  icon: <Heart className="w-4 h-4" />,
                  content:
                    'Yes! Use the surface tone customizer at the bottom of the left navigation to switch between themes or tune the shadow depth dynamically in real-time.',
                },
              ]}
            />
          </SoftCard>
        </section>

        {/* 2. BUTTONS */}
        <section id="buttons" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">Buttons (`SoftButton`)</h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Variants: Raised (embossed default), Pressed (inset debossed), Accent (glowing
                primary), and Icon
              </p>
            </div>
            <CopyButton
              code={`// 1. Soft Tinted Surfaces\n<SoftButton color="primary">Primary Blue</SoftButton>\n<SoftButton color="success">Success Emerald</SoftButton>\n<SoftButton color="danger">Danger Rose</SoftButton>\n<SoftButton color="warning">Warning Amber</SoftButton>\n<SoftButton color="purple">Purple Violet</SoftButton>\n<SoftButton color="dark">Dark Charcoal</SoftButton>\n\n// 2. Solid Accent Colors (Glow)\n<SoftButton variant="accent" color="primary">Solid Blue</SoftButton>\n<SoftButton variant="accent" color="success">Solid Success</SoftButton>\n<SoftButton variant="accent" color="danger">Solid Danger</SoftButton>\n\n// 3. Custom Surface Colors\n<SoftButton className="bg-[#d8f3dc] text-[#1b4332]">Mint Clay</SoftButton>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-8">
            {/* 1. Base Variants */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Base Physics Variants & Interaction
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <SoftButton variant="raised">Raised Default</SoftButton>
                <SoftButton
                  variant={btnActive ? 'pressed' : 'raised'}
                  onClick={() => setBtnActive(!btnActive)}
                >
                  {btnActive ? 'State: Pressed' : 'Click to Press'}
                </SoftButton>
                <SoftButton
                  variant="accent"
                  onClick={() => {
                    setAccentCount((c) => c + 1);
                    toast.success(`Action triggered ${accentCount + 1} times`);
                  }}
                >
                  Accent Action ({accentCount})
                </SoftButton>
                <SoftButton variant="flat">Flat Ghost</SoftButton>
                <SoftButton variant="raised" disabled>
                  Disabled
                </SoftButton>
              </div>
            </div>

            {/* 2. Soft Tinted Surface Colors */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                Soft Tinted Surface Colors (`color=&quot;...&quot;`)
              </span>
              <p className="text-xs text-[var(--soft-text-muted)] mb-3">
                Subtle chromatic surface tints maintaining full tactile dual-shadow extrusion and
                pressed feedback.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <SoftButton color="primary" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Primary Blue
                </SoftButton>
                <SoftButton color="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Success Emerald
                </SoftButton>
                <SoftButton color="danger" icon={<Trash2 className="w-3.5 h-3.5" />}>
                  Danger Rose
                </SoftButton>
                <SoftButton color="warning" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                  Warning Amber
                </SoftButton>
                <SoftButton color="purple" icon={<Zap className="w-3.5 h-3.5" />}>
                  Violet Purple
                </SoftButton>
                <SoftButton color="teal" icon={<TrendingUp className="w-3.5 h-3.5" />}>
                  Teal Cyan
                </SoftButton>
                <SoftButton color="dark" icon={<Moon className="w-3.5 h-3.5" />}>
                  Dark Charcoal
                </SoftButton>
              </div>
            </div>

            {/* 3. Solid Accent Colors */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                Solid Accent Surfaces with Glow (`variant=&quot;accent&quot; color=&quot;...&quot;`)
              </span>
              <p className="text-xs text-[var(--soft-text-muted)] mb-3">
                High-energy filled buttons with matching ambient colored specular shadows.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <SoftButton variant="accent" color="primary">
                  Solid Blue
                </SoftButton>
                <SoftButton variant="accent" color="success">
                  Solid Emerald
                </SoftButton>
                <SoftButton variant="accent" color="danger">
                  Solid Rose
                </SoftButton>
                <SoftButton variant="accent" color="warning">
                  Solid Amber
                </SoftButton>
                <SoftButton variant="accent" color="purple">
                  Solid Violet
                </SoftButton>
                <SoftButton variant="accent" color="teal">
                  Solid Teal
                </SoftButton>
                <SoftButton variant="accent" color="dark">
                  Solid Dark
                </SoftButton>
              </div>
            </div>

            {/* 4. Pastel Clay Surfaces */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                Pastel Clay Surfaces
              </span>
              <p className="text-xs text-[var(--soft-text-muted)] mb-3">
                Warm and gentle pastel tones embedded into the extruded clay substrate.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <SoftButton className="bg-[#d8f3dc] text-[#1b4332] dark:bg-[#1b4332]/50 dark:text-[#d8f3dc]">
                  Mint Clay
                </SoftButton>
                <SoftButton className="bg-[#ffe5d9] text-[#9d0208] dark:bg-[#9d0208]/40 dark:text-[#ffcad4]">
                  Coral Clay
                </SoftButton>
                <SoftButton className="bg-[#e2eafc] text-[#3a0ca3] dark:bg-[#3a0ca3]/40 dark:text-[#edf2fb]">
                  Lavender Clay
                </SoftButton>
                <SoftButton className="bg-[#e0fbfc] text-[#1d3557] dark:bg-[#1d3557]/40 dark:text-[#e0fbfc]">
                  Sky Clay
                </SoftButton>
                <SoftButton className="bg-[#fefae0] text-[#606c38] dark:bg-[#606c38]/40 dark:text-[#fefae0]">
                  Warm Sand
                </SoftButton>
              </div>
            </div>

            {/* 5. Sizes & Icon Positions */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Sizes & Icon Positions
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <SoftButton size="sm" icon={<Mail className="w-3.5 h-3.5" />}>
                  Small
                </SoftButton>
                <SoftButton size="md" icon={<Heart className="w-4 h-4 text-rose-500" />}>
                  Favorite
                </SoftButton>
                <SoftButton size="lg" icon={<Settings className="w-5 h-5" />} iconPosition="right">
                  Large Settings
                </SoftButton>
                <SoftButton size="icon">
                  <Bell className="w-4 h-4 text-[var(--soft-text)]" />
                </SoftButton>
                <SoftButton size="icon" variant="accent" color="primary">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </SoftButton>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 3. FORM CONTROLS */}
        <section id="inputs" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Form Controls (`SoftInput`, Checkbox, Radio, Switch)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Sunken debossed groove inputs supporting password, email, tel, and number types with
                custom icons and action accessories
              </p>
            </div>
            <CopyButton
              code={`// Email\n<SoftInput type="email" label="Email Address" icon={<Mail />} />\n\n// Password with Show/Hide Toggle\n<SoftInput type={show ? 'text' : 'password'} label="Password" icon={<Lock />} rightElement={<button onClick={toggle}><Eye /></button>} />\n\n// Telephone\n<SoftInput type="tel" label="Phone Number" placeholder="+1 (555) 000-0000" icon={<Phone />} />\n\n// Number Stepper\n<SoftInput type="number" label="Quantity" min={0} max={100} icon={<Hash />} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-8">
            {/* Standard & Search Inputs */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Text & Search Inputs
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SoftInput
                  label="Username or Display Name"
                  placeholder="e.g. jane.doe"
                  icon={<User className="w-4 h-4" />}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  helperText="Default text input with left prefix icon"
                />
                <SoftInput
                  label="Search Query"
                  type="search"
                  placeholder="Search components, tokens..."
                  icon={<Search className="w-4 h-4" />}
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  rounded="pill"
                  helperText="Pill variant with search icon prefix"
                />
              </div>
            </div>

            {/* Specialized Input Types: Email, Password, Tel, Number */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Input Types: Email, Password, Telephone & Number
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Email Input */}
                <SoftInput
                  type="email"
                  label='Email Address (type="email")'
                  placeholder="name@company.com"
                  icon={<Mail className="w-4 h-4" />}
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  helperText="Standard HTML5 email input with mail icon prefix"
                  autoComplete="email"
                />

                {/* 2. Password Input */}
                <SoftInput
                  type={showPassword ? 'text' : 'password'}
                  label='Password (type="password")'
                  placeholder="Enter secret password..."
                  icon={<Lock className="w-4 h-4" />}
                  value={passwordVal}
                  onChange={(e) => setPasswordVal(e.target.value)}
                  helperText="Click the eye icon on the right to toggle password visibility"
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                      className="p-1 rounded-lg hover:soft-raised-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-primary)] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* 3. Telephone Input */}
                <SoftInput
                  type="tel"
                  label='Telephone (type="tel")'
                  placeholder="+1 (555) 234-5678"
                  icon={<Phone className="w-4 h-4" />}
                  value={telVal}
                  onChange={(e) => setTelVal(e.target.value)}
                  helperText="Optimized for telephone number entry and mobile keypads"
                  autoComplete="tel"
                />

                {/* 4. Number Input */}
                <SoftInput
                  type="number"
                  label='Number (type="number")'
                  placeholder="0"
                  min={0}
                  max={100}
                  step={1}
                  icon={<Hash className="w-4 h-4" />}
                  value={numberVal}
                  onChange={(e) => setNumberVal(Number(e.target.value))}
                  helperText="Numeric stepper input with quick +/- adjust buttons (0 - 100)"
                  rightElement={
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setNumberVal((n) => Math.max(0, n - 1))}
                        className="w-6 h-6 rounded-md soft-surface soft-raised-xs hover:soft-pressed-xs flex items-center justify-center text-xs font-bold text-[var(--soft-text)] cursor-pointer"
                        title="Decrement"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setNumberVal((n) => Math.min(100, n + 1))}
                        className="w-6 h-6 rounded-md soft-surface soft-raised-xs hover:soft-pressed-xs flex items-center justify-center text-xs font-bold text-[var(--soft-text)] cursor-pointer"
                        title="Increment"
                      >
                        +
                      </button>
                    </div>
                  }
                />
              </div>
            </div>

            <div className="border-t border-[var(--soft-text-subtle)]/20 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)]">
                  Checkboxes
                </span>
                <SoftCheckbox
                  label="Enable Notifications"
                  checked={checked1}
                  onChange={setChecked1}
                />
                <SoftCheckbox label="Dark Ambient Mode" checked={checked2} onChange={setChecked2} />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)]">
                  Radio Options
                </span>
                <SoftRadio
                  label="Primary Light Source"
                  checked={radioVal === 'opt1'}
                  onChange={() => setRadioVal('opt1')}
                />
                <SoftRadio
                  label="Diffuse Ambient Light"
                  checked={radioVal === 'opt2'}
                  onChange={() => setRadioVal('opt2')}
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)]">
                  Toggle Switches
                </span>
                <div className="flex items-center gap-4">
                  <SoftSwitch checked={toggleVal} onChange={setToggleVal} size="sm" />
                  <SoftSwitch checked={toggleVal} onChange={setToggleVal} size="md" />
                  <SoftSwitch checked={toggleVal} onChange={setToggleVal} size="lg" />
                </div>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* DATE & TIME PICKER */}
        <section id="datetime-picker" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Date & Time Picker (`SoftDateTimePicker`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Sunken debossed groove field with floating calendar and time steppers. Supports Date
                only, Time only, and DateTime (default), plus inline card rendering.
              </p>
            </div>
            <CopyButton
              code={`// 1. DateTime (Default)\n<SoftDateTimePicker\n  mode="datetime"\n  label="Appointment Window"\n  value={dateTime}\n  onChange={(d, str) => setDateTime(d)}\n  use12Hours={true}\n/>\n\n// 2. Date Only\n<SoftDateTimePicker\n  mode="date"\n  label="Booking Date"\n  value={dateOnly}\n  onChange={(d, str) => setDateOnly(d)}\n/>\n\n// 3. Time Only\n<SoftDateTimePicker\n  mode="time"\n  label="Meeting Time"\n  value={timeOnly}\n  onChange={(d, str) => setTimeOnly(d)}\n/>\n\n// 4. Inline Embedded Calendar\n<SoftDateTimePicker\n  inline={true}\n  mode="datetime"\n  value={inlineDate}\n  onChange={(d) => setInlineDate(d)}\n/>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-4">
                Supported Modes: DateTime (Default), Date Only & Time Only
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--soft-text)]">
                      1. DateTime (Default)
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-primary)]/15 text-[var(--soft-primary)]">
                      mode="datetime"
                    </span>
                  </div>
                  <SoftDateTimePicker
                    mode="datetime"
                    label="Schedule Consultation"
                    value={demoDateTime}
                    onChange={(e) => setDemoDateTime(e)}
                    helperText="Select both date and time with 12h AM/PM steppers"
                  />
                  <div className="p-2.5 rounded-xl soft-surface soft-pressed-xs text-[11px] font-mono text-[var(--soft-text-muted)] truncate">
                    Value: {demoDateTime ? demoDateTime.toLocaleString() : 'null'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--soft-text)]">
                      2. Date Only
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-text-subtle)]/15 text-[var(--soft-text-muted)]">
                      mode="date"
                    </span>
                  </div>
                  <SoftDateTimePicker
                    mode="date"
                    label="Target Release Date"
                    value={demoDateOnly}
                    onChange={(e) => setDemoDateOnly(e)}
                    helperText="Calendar grid with auto-dismiss on day selection"
                  />
                  <div className="p-2.5 rounded-xl soft-surface soft-pressed-xs text-[11px] font-mono text-[var(--soft-text-muted)] truncate">
                    Value: {demoDateOnly ? demoDateOnly.toLocaleDateString() : 'null'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--soft-text)]">
                      3. Time Only
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--soft-text-subtle)]/15 text-[var(--soft-text-muted)]">
                      mode="time"
                    </span>
                  </div>
                  <SoftDateTimePicker
                    mode="time"
                    label="Daily Standup Time"
                    value={demoTimeOnly}
                    onChange={(e) => setDemoTimeOnly(e)}
                    helperText="Hours & minutes stepper with quick time presets"
                  />
                  <div className="p-2.5 rounded-xl soft-surface soft-pressed-xs text-[11px] font-mono text-[var(--soft-text-muted)] truncate">
                    Value:{' '}
                    {demoTimeOnly
                      ? demoTimeOnly.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'null'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--soft-text-subtle)]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-4">
                Inline Embedding & Form Controls
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--soft-text)]">
                      Inline Calendar Panel (inline={true})
                    </span>
                    <span className="text-xs text-[var(--soft-text-muted)]">Directly in card</span>
                  </div>
                  <SoftDateTimePicker
                    inline={true}
                    mode="datetime"
                    value={demoInlineDate}
                    onChange={(e) => setDemoInlineDate(e)}
                    className="flex justify-center"
                  />
                </div>

                <div className="lg:col-span-6 space-y-5">
                  <div className="p-4 rounded-2xl soft-surface soft-pressed-xs space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
                      Selected Value Inspector
                    </span>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-[var(--soft-text-subtle)]/10">
                        <span className="text-[var(--soft-text-muted)]">ISO String:</span>
                        <span className="text-[var(--soft-primary)] font-bold truncate max-w-[220px]">
                          {demoInlineDate ? demoInlineDate.toISOString() : 'null'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[var(--soft-text-subtle)]/10">
                        <span className="text-[var(--soft-text-muted)]">Unix Timestamp:</span>
                        <span className="text-[var(--soft-text)]">
                          {demoInlineDate ? demoInlineDate.getTime() : 'null'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[var(--soft-text-muted)]">UTC Year/Month/Day:</span>
                        <span className="text-[var(--soft-text)]">
                          {demoInlineDate
                            ? `${demoInlineDate.getUTCFullYear()}-${(demoInlineDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${demoInlineDate.getUTCDate().toString().padStart(2, '0')}`
                            : 'null'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <SoftButton
                        size="sm"
                        variant="flat"
                        onClick={() => setDemoInlineDate(new Date())}
                      >
                        Reset to Today
                      </SoftButton>
                      <SoftButton
                        size="sm"
                        variant="flat"
                        onClick={() => {
                          const next = new Date();
                          next.setDate(next.getDate() + 1);
                          setDemoInlineDate(next);
                        }}
                      >
                        +1 Day (Tomorrow)
                      </SoftButton>
                      <SoftButton size="sm" variant="flat" onClick={() => setDemoInlineDate(null)}>
                        Clear Selection
                      </SoftButton>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <SoftDateTimePicker
                      mode="date"
                      label="Disabled Date Picker"
                      disabled={true}
                      value={new Date(2026, 8, 13)}
                      helperText="Interaction disabled with reduced opacity"
                    />
                    <SoftDateTimePicker
                      mode="time"
                      label="Validation Error State"
                      value={null}
                      error="Please select an operative timeslot"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 9. SLIDERS */}
        <section id="sliders" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Range Sliders (`SoftSlider`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Sunken debossed groove slider with drag/click interaction and real-time live value
                readout
              </p>
            </div>
            <CopyButton
              code={`<SoftSlider value={value} onChange={setValue} min={0} max={100} showValue={true} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
              Interactive Range Slider (Drag or Click)
            </span>
            <SoftSlider value={sliderVal} onChange={setSliderVal} showValue={true} />
          </SoftCard>
        </section>

        {/* 10. DIALOG (MODAL) */}
        <section id="dialog" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Dialog Modal (`SoftDialog`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Accessible HTML5 dialog with light-dismiss, backdrop blur, and keyboard trap
              </p>
            </div>
            <CopyButton
              code={`<SoftDialog open={open} onClose={() => setOpen(false)} title="Confirm Action">\n  Dialog content...\n</SoftDialog>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                  Interactive Modal Window
                </span>
                <p className="text-xs text-[var(--soft-text-muted)]">
                  Click the button below to launch a neumorphic modal dialog with backdrop blur.
                </p>
              </div>
              <SoftButton
                variant="accent"
                onClick={() => setDialogOpen(true)}
                icon={<SlidersHorizontal className="w-4 h-4" />}
              >
                Open Soft Dialog Modal
              </SoftButton>
            </div>
          </SoftCard>

          <SoftDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Classic Soft Modal Dialog"
            description="A fully accessible modal window using native HTML dialog semantics."
            onConfirm={() => {
              setDialogOpen(false);
              toast.success('Action successfully confirmed!');
            }}
            confirmLabel="Save Changes"
          >
            <div className="space-y-4 py-2">
              <p className="text-sm text-[var(--soft-text)]">
                This modal uses native{' '}
                <code className="px-2 py-0.5 rounded soft-pressed-xs text-[var(--soft-primary)]">
                  closedby=&quot;any&quot;
                </code>{' '}
                with smooth backdrop blur. You can dismiss it by:
              </p>
              <ul className="space-y-2 text-xs text-[var(--soft-text-muted)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Clicking anywhere on the background overlay (light-dismiss)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Pressing the{' '}
                  <kbd className="px-1.5 py-0.5 rounded soft-pressed-xs font-mono">Esc</kbd> key
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Clicking the close button or Cancel
                </li>
              </ul>
              <div className="pt-2">
                <SoftInput
                  label="Quick Feedback Note"
                  placeholder="Enter a brief note..."
                  rounded="lg"
                />
              </div>
            </div>
          </SoftDialog>
        </section>

        {/* 11. POPUP MENU */}
        <section id="popup-menu" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Popup Menu (`SoftPopupMenu`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Floating dropdown menu with keyboard shortcuts, section dividers, and danger actions
              </p>
            </div>
            <CopyButton
              code={`<SoftPopupMenu trigger={<SoftButton>Actions</SoftButton>} items={[\n  { id: 'edit', label: 'Edit', icon: <User />, shortcut: '⌘E' },\n  { id: 'del', label: 'Delete', danger: true }\n]} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                  Dropdown Trigger Menu
                </span>
                <p className="text-xs text-[var(--soft-text-muted)]">
                  Click the button below to toggle the floating context menu.
                </p>
              </div>

              <SoftPopupMenu
                trigger={
                  <SoftButton variant="raised" icon={<Settings className="w-4 h-4" />}>
                    Quick Actions Menu ▾
                  </SoftButton>
                }
                items={[
                  {
                    id: 'edit',
                    label: 'Edit Profile',
                    icon: <User className="w-3.5 h-3.5" />,
                    shortcut: '⌘E',
                  },
                  {
                    id: 'share',
                    label: 'Share Link',
                    icon: <Share2 className="w-3.5 h-3.5" />,
                    shortcut: '⌘S',
                  },
                  {
                    id: 'ext',
                    label: 'Open in Browser',
                    icon: <ExternalLink className="w-3.5 h-3.5" />,
                  },
                  { id: 'div1', divider: true },
                  {
                    id: 'del',
                    label: 'Delete Item',
                    icon: <Trash2 className="w-3.5 h-3.5" />,
                    danger: true,
                  },
                ]}
              />
            </div>
          </SoftCard>
        </section>

        {/* 1. TYPOGRAPHY */}
        <section id="typography" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)] flex items-center gap-2">
                <Type className="w-5 h-5 text-[var(--soft-primary)]" />
                Typography (`SoftText` / `Text`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Headings (h1–h6), body, caption, small, weights, and combinable formatting modifiers
                (bold, italic, strikethrough, underline).
              </p>
            </div>
            <CopyButton
              code={`import { Text } from './components/soft-ui';\n\n// Headings & Shorthands\n<Text h1>Heading 1</Text>\n<Text h2>Heading 2</Text>\n<Text h3>Heading 3</Text>\n<Text h4>Heading 4</Text>\n<Text h5>Heading 5</Text>\n<Text h6>Heading 6</Text>\n\n// Body, Caption, Small\n<Text body>Standard body text for descriptions and content.</Text>\n<Text caption>Caption text for labels and indicators</Text>\n<Text small>Small supplementary footnote</Text>\n\n// Combinable Formatting\n<Text h3 bold italic underline color="primary">\n  Bold + Italic + Underline Accent\n</Text>\n<Text body bold strikethrough color="danger">\n  Deprecated price: $99.00\n</Text>\n\n// Weights Scale\n<Text body weight="light">Light 300</Text>\n<Text body weight="normal">Normal 400</Text>\n<Text body weight="medium">Medium 500</Text>\n<Text body weight="semibold">Semibold 600</Text>\n<Text body weight="bold">Bold 700</Text>\n<Text body weight="extrabold">Extrabold 800</Text>\n<Text body weight="black">Black 900</Text>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-8">
            {/* Headings Hierarchy */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Heading Scale (h1 – h6)
              </span>
              <div className="space-y-3 p-4 rounded-xl soft-pressed-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--soft-text-subtle)]/10 pb-2">
                  <Text h1>Heading 1 (h1)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h1&gt;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--soft-text-subtle)]/10 pb-2">
                  <Text h2>Heading 2 (h2)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h2&gt;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--soft-text-subtle)]/10 pb-2">
                  <Text h3>Heading 3 (h3)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h3&gt;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--soft-text-subtle)]/10 pb-2">
                  <Text h4>Heading 4 (h4)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h4&gt;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--soft-text-subtle)]/10 pb-2">
                  <Text h5>Heading 5 (h5)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h5&gt;
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <Text h6>Heading 6 (h6)</Text>
                  <span className="text-xs text-[var(--soft-text-muted)] font-mono">
                    &lt;Text h6&gt;
                  </span>
                </div>
              </div>
            </div>

            {/* Body, Caption, Small */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-3">
                Body, Caption & Small Variants
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl soft-raised-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--soft-primary)]">
                      Body
                    </span>
                    <span className="text-[10px] text-[var(--soft-text-muted)] font-mono">
                      &lt;Text body&gt;
                    </span>
                  </div>
                  <Text body>
                    Classic Soft typography balances optical legibility with subtle ambient surface
                    contrast.
                  </Text>
                </div>
                <div className="p-4 rounded-xl soft-raised-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--soft-primary)]">
                      Caption
                    </span>
                    <span className="text-[10px] text-[var(--soft-text-muted)] font-mono">
                      &lt;Text caption&gt;
                    </span>
                  </div>
                  <Text caption color="muted">
                    Sub-label text for status indicators, timestamps, badge metadata, and tactile
                    breadcrumbs.
                  </Text>
                </div>
                <div className="p-4 rounded-xl soft-raised-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--soft-primary)]">
                      Small
                    </span>
                    <span className="text-[10px] text-[var(--soft-text-muted)] font-mono">
                      &lt;Text small&gt;
                    </span>
                  </div>
                  <Text small color="subtle">
                    Footnotes, copyright notices, micro-copy, and legal disclaimers.
                  </Text>
                </div>
              </div>
            </div>

            {/* Combinable Formatting Modifiers */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                Combinable Formatting Modifiers
              </span>
              <p className="text-xs text-[var(--soft-text-muted)] mb-3">
                Combine `bold`, `italic`, `strikethrough`, and `underline` props on any variant or
                heading.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body bold>
                    Bold Only
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text body bold&gt;
                  </div>
                </div>
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body italic>
                    Italicized Only
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text body italic&gt;
                  </div>
                </div>
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body underline color="primary">
                    Underlined Highlight
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text underline color=&quot;primary&quot;&gt;
                  </div>
                </div>
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body strikethrough color="danger">
                    Deprecated Feature
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text strikethrough color=&quot;danger&quot;&gt;
                  </div>
                </div>
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body bold italic underline color="primary">
                    Bold + Italic + Underline
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text bold italic underline&gt;
                  </div>
                </div>
                <div className="p-3.5 rounded-xl soft-pressed-xs space-y-1">
                  <Text body bold strikethrough italic color="muted">
                    Bold + Italic + Strike
                  </Text>
                  <div className="text-[11px] text-[var(--soft-text-muted)] font-mono">
                    &lt;Text bold italic strikethrough&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Weights Scale */}
            <div className="pt-4 border-t border-[var(--soft-text-subtle)]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block mb-1">
                Font Weight Scale (`weight=&quot;...&quot;`)
              </span>
              <p className="text-xs text-[var(--soft-text-muted)] mb-3">
                Explicit typography weights ranging from light (300) to black (900).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 text-center">
                {(
                  [
                    { w: 'light', label: 'Light', num: '300' },
                    { w: 'normal', label: 'Normal', num: '400' },
                    { w: 'medium', label: 'Medium', num: '500' },
                    { w: 'semibold', label: 'Semibold', num: '600' },
                    { w: 'bold', label: 'Bold', num: '700' },
                    { w: 'extrabold', label: 'Extrabold', num: '800' },
                    { w: 'black', label: 'Black', num: '900' },
                  ] as const
                ).map(({ w, label, num }) => (
                  <div key={w} className="p-3 rounded-xl soft-raised-xs">
                    <Text body weight={w} className="text-base sm:text-lg block">
                      Aa
                    </Text>
                    <span className="text-[11px] font-semibold text-[var(--soft-text)] block mt-0.5">
                      {label}
                    </span>
                    <span className="text-[10px] text-[var(--soft-text-muted)] font-mono block">
                      {num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 5. PROGRESS BARS */}
        <section id="progress" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Progress Bars (`SoftProgressBar`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Sunken track progress bar with smooth animated fills, pulsing animation, and custom
                colors
              </p>
            </div>
            <CopyButton
              code={`<SoftProgressBar value={progress} label="Loading Assets" showLabel={true} animated={true} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <SoftProgressBar
                  value={progressVal}
                  label="System Resource Usage"
                  showLabel={true}
                  color="var(--soft-primary)"
                />
                <div className="flex gap-2 mt-3">
                  <SoftButton size="sm" onClick={() => setProgressVal((v) => Math.max(0, v - 10))}>
                    -10%
                  </SoftButton>
                  <SoftButton
                    size="sm"
                    onClick={() => setProgressVal((v) => Math.min(100, v + 10))}
                  >
                    +10%
                  </SoftButton>
                </div>
              </div>

              <div>
                <SoftProgressBar
                  value={84}
                  label="Optimized Assets Pipeline (Animated)"
                  showLabel={true}
                  animated={true}
                  color="var(--soft-success)"
                />
                <p className="text-xs text-[var(--soft-text-subtle)] mt-3">
                  Smooth pulse animation with inner glow reflection.
                </p>
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 6. AVATARS */}
        <section id="avatars" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">Avatars (`SoftAvatar`)</h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Tactile user initials and profile images with status indicators (online, busy, away,
                offline)
              </p>
            </div>
            <CopyButton
              code={`<SoftAvatar initials="JD" name="Jane Doe" status="online" statusText="Online" size="md" />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
              Avatar Statuses & Sizes
            </span>
            <div className="flex flex-wrap items-center gap-8 py-2">
              <SoftAvatar
                initials="JD"
                name="Jane Doe"
                status="online"
                statusText="Online"
                size="md"
              />
              <SoftAvatar
                initials="AL"
                name="Alex Liu"
                status="busy"
                statusText="In a meeting"
                size="md"
              />
              <SoftAvatar
                initials="SK"
                name="Sam K."
                status="away"
                statusText="Idle 10m"
                size="md"
              />
              <SoftAvatar
                initials="TC"
                name="Tina Chen"
                status="offline"
                statusText="Offline"
                size="sm"
              />
              <SoftAvatar initials="MR" name="Marcus Ray" size="lg" />
            </div>
          </SoftCard>
        </section>

        {/* 7. CHIPS & TAGS */}
        <section id="chips" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Chips & Tags (`SoftChip`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Pill tags with raised and pressed toggle states for multi-selection filters and
                categories
              </p>
            </div>
            <CopyButton
              code={`<SoftChip label="Design" selected={isSelected} onClick={() => toggle('Design')} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
              Interactive Filter Tags
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {['Design', 'Music', 'Code', 'Photo', 'Architecture', 'Sculpture', 'AI Models'].map(
                (chip) => (
                  <SoftChip
                    key={chip}
                    label={chip}
                    selected={selectedChips.includes(chip)}
                    onClick={() => handleChipToggle(chip)}
                  />
                )
              )}
            </div>
            <p className="text-xs text-[var(--soft-text-subtle)] mt-2">
              Selected tags: {selectedChips.join(', ') || 'None'}
            </p>
          </SoftCard>
        </section>

        {/* 12. TOAST NOTIFICATIONS */}
        <section id="toasts" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Toast Notifications (`useToast`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Non-blocking floating toasts with duration countdown bars and multiple status
                variants
              </p>
            </div>
            <CopyButton
              code={`const toast = useToast();\ntoast.success('Operation completed successfully!');\ntoast.error('Something went wrong.');`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
              Trigger Interactive Toasts (look at the bottom-right corner)
            </span>
            <div className="flex flex-wrap items-center gap-3.5">
              <SoftButton
                variant="raised"
                onClick={() => toast.success('Profile settings updated successfully!')}
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              >
                Success Toast
              </SoftButton>
              <SoftButton
                variant="raised"
                onClick={() => toast.error('Failed to sync network changes.', 'Connection Error')}
                icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
              >
                Error Toast
              </SoftButton>
              <SoftButton
                variant="raised"
                onClick={() =>
                  toast.warning('Low battery or power saving active.', 'System Notice')
                }
                icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
              >
                Warning Toast
              </SoftButton>
              <SoftButton
                variant="raised"
                onClick={() => toast.info('A new software update is available.', 'Information')}
                icon={<Info className="w-4 h-4 text-[var(--soft-primary)]" />}
              >
                Info Toast
              </SoftButton>
            </div>
          </SoftCard>
        </section>

        {/* 17. IMAGE FRAME */}
        <section id="image" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Image Frame & Lightbox (`SoftImage`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Beveled tactile frames with aspect ratios, captions, and full-screen lightbox
                preview on click
              </p>
            </div>
            <CopyButton
              code={`<SoftImage src="https://..." aspectRatio="16:9" caption="Photo" enableLightbox={true} />`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7">
                <SoftImage
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
                  alt="Soft Architectural Abstract"
                  aspectRatio="16:9"
                  caption="Click the image to expand full-screen in Lightbox"
                  enableLightbox={true}
                />
              </div>
              <div className="md:col-span-5 grid grid-cols-2 gap-4">
                <SoftImage
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
                  alt="Minimalist Clay Art"
                  aspectRatio="1:1"
                  caption="1:1 Square"
                  enableLightbox={true}
                />
                <SoftImage
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  alt="Serene Shore"
                  aspectRatio="1:1"
                  caption="Tactile Frame"
                  enableLightbox={true}
                />
              </div>
            </div>
          </SoftCard>
        </section>

        {/* 18. IMAGE GALLERY */}
        <section id="gallery" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)] flex items-center gap-2">
                <Images className="w-5 h-5 text-[var(--soft-primary)]" />
                Image Gallery (`SoftImageGallery`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Multi-image slideshow with interactive thumbnail track, grid view switch, autoplay
                timer, and full-screen modal
              </p>
            </div>
            <CopyButton
              code={`import { SoftImageGallery } from './components/soft-ui';\n\n<SoftImageGallery\n  images={[\n    {\n      id: 1,\n      src: 'https://...',\n      title: 'Architectural Fluid Curves',\n      description: 'Minimalist surface geometries...',\n      category: 'Architecture'\n    },\n    // ...more images\n  ]}\n  showThumbnails={true}\n  autoplayInterval={5000}\n  enableFullscreen={true}\n  aspectRatio="16:9"\n/>`}
            />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="p-4 sm:p-6">
            <SoftImageGallery
              images={SAMPLE_GALLERY_IMAGES}
              showThumbnails={true}
              autoplayInterval={0}
              enableFullscreen={true}
              aspectRatio="16:9"
            />
          </SoftCard>
        </section>

        {/* 20. AUDIO PLAYER */}
        <section id="audio-player" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)] flex items-center gap-2">
                <Music className="w-5 h-5 text-[var(--soft-primary)]" />
                Audio Player (`SoftAudioPlayer`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Tactile media player featuring spinning vinyl disk animation, interactive scrub
                rail, playlist queue, and smooth volume slider
              </p>
            </div>
            <CopyButton
              code={`import { SoftAudioPlayer } from './components/soft-ui';\n\n<SoftAudioPlayer\n  tracks={[\n    {\n      id: 1,\n      title: 'Aesthetic Solitude',\n      artist: 'Classic Neumorphic Beats',\n      duration: 225,\n      coverArt: 'https://...'\n    }\n  ]}\n  autoPlay={false}\n  showPlaylist={true}\n/>`}
            />
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <SoftAudioPlayer showPlaylist={true} defaultMinimized={false} />

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--soft-text-subtle)] block">
                Minimized Pill State (`defaultMinimized={true}`)
              </span>
              <SoftAudioPlayer showPlaylist={false} defaultMinimized={true} initialTrackIndex={1} />
            </div>
          </div>
        </section>

        {/* 21. VIDEO PLAYER */}
        <section id="video-player" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)] flex items-center gap-2">
                <Video className="w-5 h-5 text-[var(--soft-primary)]" />
                Video Player (`SoftVideoPlayer`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Immersive video viewer with ambient gradient overlay, timeline scrubbing, 10s skip
                controls, speed selector, and full-screen mode
              </p>
            </div>
            <CopyButton
              code={`import { SoftVideoPlayer } from './components/soft-ui';\n\n<SoftVideoPlayer\n  title="Neumorphic Surface Simulation"\n  subtitle="Dual Light Angles at 135°"\n  poster="https://..."\n  aspectRatio="16:9"\n  autoPlay={false}\n/>`}
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <SoftVideoPlayer
              title="Classic Soft Material Dynamics"
              subtitle="Real-time specular ray reflections and sunken groove physics"
              aspectRatio="16:9"
            />
          </div>
        </section>

        {/* 19. PDF VIEWER */}
        <section id="pdf-viewer" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[var(--soft-primary)]" />
                PDF Viewer (`SoftPDFViewer`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Document reader featuring pagination controls, zoom in/out, 90° rotation, download
                trigger, and full-screen expansion
              </p>
            </div>
            <CopyButton
              code={`import { SoftPDFViewer } from './components/soft-ui';\n\n// Embedded or simulated specification viewer\n<SoftPDFViewer\n  title="Design_System_Spec.pdf"\n  subtitle="Official Guidelines"\n  totalPages={12}\n  initialPage={1}\n  allowDownload={true}\n  height="540px"\n/>`}
            />
          </div>

          <SoftPDFViewer
            title="Classic_Soft_Optics_Specification.pdf"
            subtitle="Physics of Twin-Light Vectors & Neumorphic Geometry"
            totalPages={8}
            initialPage={1}
            height="580px"
          />
        </section>

        {/* 22. MARKDOWN VIEWER */}
        <section id="markdown" className="space-y-4 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[var(--soft-text)]">
                Markdown Viewer (`SoftMarkdownViewer`)
              </h3>
              <p className="text-xs text-[var(--soft-text-muted)]">
                Rich markdown document rendering supporting LaTeX equations, tables, code blocks,
                and blockquotes
              </p>
            </div>
            <CopyButton code={`<SoftMarkdownViewer content={markdownString} />`} />
          </div>

          <SoftCard elevation="md" rounded="2xl" className="p-6">
            <SoftMarkdownViewer content={SAMPLE_MARKDOWN} />
          </SoftCard>
        </section>
      </div>
    </div>
  );
};

export default ComponentCatalog;
