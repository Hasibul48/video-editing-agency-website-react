<?php
if (!defined('ABSPATH')) exit;

define('BRANDJO_THEME_VERSION', '1.0.0');
define('BRANDJO_THEME_DIR', get_template_directory());
define('BRANDJO_THEME_URI', get_template_directory_uri());

// ============================================================
// 1. THEME SETUP
// ============================================================
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['script', 'style']);
});

// ============================================================
// 2. ENQUEUE ASSETS
// ============================================================
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('brandjo-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap', [], null);

    $manifest_path = BRANDJO_THEME_DIR . '/dist/.vite/manifest.json';
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
        if (!empty($manifest)) {
            $entry = $manifest['index.html'] ?? null;
            if ($entry) {
                $css_files = $entry['css'] ?? [];
                foreach ($css_files as $css) {
                    wp_enqueue_style('brandjo-app-css', BRANDJO_THEME_URI . '/dist/' . $css, [], BRANDJO_THEME_VERSION);
                }
                $js_file = $entry['file'] ?? '';
                if ($js_file) {
                    wp_enqueue_script('brandjo-app', BRANDJO_THEME_URI . '/dist/' . $js_file, [], BRANDJO_THEME_VERSION, true);
                }
            }
        }
    } else {
        wp_enqueue_script('brandjo-app', BRANDJO_THEME_URI . '/assets/js/app.js', [], BRANDJO_THEME_VERSION, true);
    }
});

// ============================================================
// 3. ADMIN BAR ADJUSTMENT FOR FIXED NAVBAR
// ============================================================
add_action('wp_head', function () {
    if (!is_admin_bar_showing()) return;
    ?>
    <style>
        body.admin-bar .fixed.top-0 { top: 32px; }
        @media screen and (max-width: 782px) {
            body.admin-bar .fixed.top-0 { top: 46px; }
        }
    </style>
    <?php
});

// ============================================================
// 4. ACF OPTIONS PAGES
// ============================================================
add_action('init', function () {
    if (!function_exists('acf_add_options_page')) return;

    acf_add_options_page([
        'page_title' => 'Brandjo Media',
        'menu_title' => 'Brandjo Media',
        'menu_slug'  => 'brandjo-media',
        'position'   => 3,
        'icon_url'   => 'dashicons-welcome-widgets-menus',
        'redirect'   => true,
        'capability' => 'manage_options',
        'autoload'   => true,
    ]);

    $tabs = [
        'hero'        => 'Hero',
        'services'    => 'Services',
        'about'       => 'About',
        'projects'    => 'Projects',
        'testimonials'=> 'Testimonials',
        'pricing'     => 'Pricing',
        'faq'         => 'FAQ',
        'final-cta'   => 'Final CTA',
        'intro-video' => 'Intro Video',
        'footer'      => 'Footer / Contact',
        'buttons'     => 'Buttons',
        'global'      => 'Global Settings',
    ];

    foreach ($tabs as $slug => $title) {
        acf_add_options_sub_page([
            'page_title'  => $title . ' Section',
            'menu_title'  => $title,
            'menu_slug'   => "brandjo-media-{$slug}",
            'parent_slug' => 'brandjo-media',
            'capability'  => 'manage_options',
            'autoload'    => true,
        ]);
    }
}, 20);

// ============================================================
// 5. ACF FIELD GROUPS
// ============================================================
require_once BRANDJO_THEME_DIR . '/inc/acf-fields.php';

// ============================================================
// 5.5. ACF DEFAULT DATA IMPORTER
// ============================================================
add_action('after_switch_theme', function () {
    set_transient('brandjo_acf_import', true, 60);
});

add_action('admin_init', function () {
    if (!get_transient('brandjo_acf_import')) return;
    delete_transient('brandjo_acf_import');
    if (!function_exists('update_field')) return;
    if (get_option('brandjo_acf_imported')) return;
    brandjo_import_default_acf_data();
    set_transient('brandjo_acf_import_notice', true, 30);
});

add_action('admin_notices', function () {
    if (!get_transient('brandjo_acf_import_notice')) return;
    delete_transient('brandjo_acf_import_notice');
    echo '<div class="notice notice-success is-dismissible"><p><strong>Brandjo Media:</strong> All default content has been imported. You can now edit any section under the <strong>Brandjo Media</strong> menu.</p></div>';
});

function brandjo_import_default_acf_data() {
    // -- Global: Nav Links --
    update_field('nav_links', [
        ['name' => 'Home', 'href' => '#home'],
        ['name' => 'Services', 'href' => '#services'],
        ['name' => 'Projects', 'href' => '#projects'],
        ['name' => 'Pricing', 'href' => '#pricing'],
        ['name' => 'FAQ', 'href' => '#faq'],
        ['name' => 'Contact', 'href' => '#contact'],
    ], 'option');

    // -- Global: Social Links --
    update_field('social_links', [
        ['platform' => 'linkedin', 'url' => 'https://linkedin.com'],
        ['platform' => 'twitter', 'url' => 'https://twitter.com'],
        ['platform' => 'instagram', 'url' => 'https://instagram.com'],
        ['platform' => 'youtube', 'url' => 'https://youtube.com'],
    ], 'option');

    // -- Global: Contact --
    update_field('email', 'directors@brandjo.media', 'option');
    update_field('studio_location', 'Creative Studio Paris / London Soho Hub - Operating Worldwide', 'option');
    update_field('copyright', '© ' . date('Y') . ' Brandjo Media. All rights reserved.', 'option');
    update_field('site_name', 'Brandjo Media', 'option');
    update_field('site_description', 'Premium video editing and brand strategy agency.', 'option');

    // -- Hero --
    update_field('hero', [
        'headline' => 'Content That Makes Brands',
        'headline_highlight' => 'Impossible to Ignore.',
        'subheadline' => 'We help premium brands grow scaling attention through cinematic content, high-value strategic storytelling, and performance-driven growth marketing systems.',
        'cta_primary' => 'Start Your Brand',
        'cta_secondary' => 'View Projects',
        'scroll_text' => 'DISCOVER THE MOVEMENT',
        'stats' => [
            ['value' => '120M+', 'label' => 'Views Generated', 'description' => 'Through strategic, high-retention cinematic concepts.'],
            ['value' => '50+', 'label' => 'Brands Scaled', 'description' => 'Enterprise SaaS, luxury fashion, and elite personal networks.'],
            ['value' => '4.9', 'label' => 'Client Satisfaction', 'description' => 'Uncompromising service standards and real revenue ROI.'],
        ],
    ], 'option');

    // -- Services --
    update_field('services', [
        'section_header' => 'SPECIALIZED CAPABILITIES',
        'section_title' => 'A Complete Brand Growth Architecture.',
        'section_subtext' => 'We don\'t sell hours or simple generic edits. We build high-throughput creative systems that integrate premium storytelling directly into qualified lead generation.',
        'items' => [
            [
                'id' => 'content-marketing',
                'title' => 'Content Marketing',
                'description' => 'Multi-channel content engines that position your brand as the absolute authority and generate high-intent inbound opportunities.',
                'icon_name' => 'FileText',
                'benefits' => [
                    ['benefit' => 'Authority Building'],
                    ['benefit' => 'SEO Ecosystems'],
                    ['benefit' => 'Inbound Funnels'],
                ],
            ],
            [
                'id' => 'video-editing',
                'title' => 'Video Editing',
                'description' => 'Cinematic human-centric short and long-form video curation built to completely dominate social algorithms and retain eye contact.',
                'icon_name' => 'Video',
                'benefits' => [
                    ['benefit' => 'Cinematic Grading'],
                    ['benefit' => 'Dynamic Soundscapes'],
                    ['benefit' => 'Micro-Retention Hooks'],
                ],
            ],
            [
                'id' => 'brand-strategy',
                'title' => 'Brand Strategy',
                'description' => 'Complete visual identity, tone of voice guidelines, and competitive brand positioning to command premium pricing.',
                'icon_name' => 'Compass',
                'benefits' => [
                    ['benefit' => 'Market Differentiation'],
                    ['benefit' => 'Visual Identity Systems'],
                    ['benefit' => 'Premium Tone & Voice'],
                ],
            ],
            [
                'id' => 'social-media-growth',
                'title' => 'Social Media Growth',
                'description' => 'Calculated attention-grabbing marketing playbooks engineered for organic, explosive reach across TikTok, YouTube, and LinkedIn.',
                'icon_name' => 'TrendingUp',
                'benefits' => [
                    ['benefit' => 'Trend Architecture'],
                    ['benefit' => 'Daily Publishing Systems'],
                    ['benefit' => 'Viral Loop Engineering'],
                ],
            ],
            [
                'id' => 'creative-direction',
                'title' => 'Creative Direction',
                'description' => 'End-to-end creative campaigns, artistic oversight, and concept prototyping to turn complex business ideas into stunning visual stories.',
                'icon_name' => 'Sparkles',
                'benefits' => [
                    ['benefit' => 'Cinematic Storyboards'],
                    ['benefit' => 'Concept Validation'],
                    ['benefit' => 'Uncompromising Aesthetics'],
                ],
            ],
            [
                'id' => 'paid-advertising',
                'title' => 'Paid Advertising',
                'description' => 'High-ROI traffic systems integrating premium content creative with surgical audience targeting for rapid customer acquisition.',
                'icon_name' => 'Activity',
                'benefits' => [
                    ['benefit' => 'Creatives-First Ad Optimization'],
                    ['benefit' => 'Meta & YT Specialist Setup'],
                    ['benefit' => 'Conversion Attribution'],
                ],
            ],
        ],
    ], 'option');

    // -- About --
    update_field('about', [
        'manifesto' => [
            ['paragraph' => 'In an era of generic reels and saturated algorithmic feeds, standard marketing fails immediately. Fading into the digital noise is the absolute highest expense a modern premium enterprise can pay.'],
            ['paragraph' => 'Brandjo Media was established to rewrite standard outreach playbook boundaries. We combine the stylistic elegance of luxury fashion houses with the rigid, metrics-first tracking protocols of a modern SaaS engineering firm to position your brand as the only true logical option in your market space.'],
        ],
        'stats' => [
            ['value' => '250+', 'label' => 'Projects Completed'],
            ['value' => '40M+', 'label' => 'Monthly Reach Generated'],
            ['value' => '7-Fig', 'label' => 'Client Revenue Generated'],
        ],
        'quality_badge' => 'Elite Creative Production Standards - No stock elements, no cookie-cutter templates, no exceptions.',
        'workflow' => [
            [
                'id' => 't-1',
                'year' => 'Phase 1: Diagnosis',
                'title' => 'Brand Audit & Content Archetype Blueprinting',
                'description' => 'We deep-dive into your existing brand assets, audience analytics, and competitor gaps to architect a custom content blueprint aligned with your growth objectives.',
            ],
            [
                'id' => 't-2',
                'year' => 'Phase 2: Production',
                'title' => 'Creative Storyboarding & Cinematic Execution',
                'description' => 'Our world-class design studio produces high-retention video assets, motion graphics, and static creatives following the exact specifications from phase one.',
            ],
            [
                'id' => 't-3',
                'year' => 'Phase 3: Launch',
                'title' => 'Platform-Specific Distribution & Ad Systems',
                'description' => 'We deploy content natively across TikTok, Instagram, YouTube, and LinkedIn with platform-optimized formatting, captions, and paid amplification tactics.',
            ],
            [
                'id' => 't-4',
                'year' => 'Phase 4: Dominate',
                'title' => 'Inbound Pipeline Integration & Growth System Scale',
                'description' => 'We integrate lead qualification cards, track conversion attribution, and iterate on high-performing creative variables to scale the system further.',
            ],
        ],
    ], 'option');

    // -- Projects --
    update_field('projects', [
        'section_header' => 'PORTFOLIO',
        'section_title' => 'Projects.',
        'categories' => [
            ['category' => 'All'],
            ['category' => 'Fashion Brand Campaign'],
            ['category' => 'SaaS Launch'],
            ['category' => 'Restaurant Rebrand'],
            ['category' => 'Personal Brand Growth'],
            ['category' => 'Product Commercial'],
        ],
        'items' => [
            ['id' => 'p1', 'title' => 'Never Gonna Give You Up', 'video_id' => 'dQw4w9WgXcQ', 'description' => 'High-energy music video production - color grading, rhythm cutting, and dynamic motion graphics.', 'category' => 'Fashion Brand Campaign', 'client' => 'AURA Paris', 'metrics' => '+340% Engagement Rate'],
            ['id' => 'p2', 'title' => 'See You Again', 'video_id' => 'RgKAFK5djSk', 'description' => 'Cinematic storytelling through seamless transitions, emotional pacing, and atmospheric sound design.', 'category' => 'SaaS Launch', 'client' => 'Synthetix Labs', 'metrics' => '2.1M Views'],
            ['id' => 'p3', 'title' => 'Shape of You', 'video_id' => 'JGwWNGJdvx8', 'description' => 'Abstract visual narrative with stylised overlays, split-screen composition, and branded title sequences.', 'category' => 'Restaurant Rebrand', 'client' => 'Vertex Systems', 'metrics' => '870K Reach'],
            ['id' => 'p4', 'title' => 'Counting Stars', 'video_id' => 'hT_nvWreIhg', 'description' => 'Live concert footage edited into a high-impact promotional cut with multi-camera sync.', 'category' => 'Personal Brand Growth', 'client' => 'Synergy Group', 'metrics' => '1.4M Impressions'],
            ['id' => 'p5', 'title' => 'Uptown Funk', 'video_id' => 'OPf0YbXqDm0', 'description' => 'Retro-inspired commercial edit with frame-perfect beatsync and vibrant colour LUTs.', 'category' => 'Product Commercial', 'client' => 'Nexus Agency', 'metrics' => '560K Views'],
            ['id' => 'p6', 'title' => 'Roar', 'video_id' => 'CevxZvSJLk8', 'description' => 'Brand empowerment reel combining slow-motion hero shots with typographic kinetic text.', 'category' => 'Fashion Brand Campaign', 'client' => 'Brandjo Media', 'metrics' => '920K Reach'],
            ['id' => 'p7', 'title' => 'Shake It Off', 'video_id' => 'HP-MbfHFUqs', 'description' => 'Fast-paced social cut designed for vertical platforms - quick jumps, overlay stickers, and bold captions.', 'category' => 'SaaS Launch', 'client' => 'Brandjo Media', 'metrics' => '1.8M Impressions'],
        ],
    ], 'option');

    // -- Reviews --
    update_field('reviews', [
        'items' => [
            [
                'id' => 'rev-1',
                'quote' => 'Brandjo completely transformed our online presence. Our engagement rates tripled within the first two months, and the quality of leads we\'re now attracting is genuinely remarkable.',
                'author' => 'Elena Vance',
                'role' => 'VP of Marketing, Synthetix Labs',
                'rating' => 5,
                'company_name' => 'SYNTHETIX',
            ],
            [
                'id' => 'rev-2',
                'quote' => 'The content quality feels cinematic — every piece they produce looks like it belongs in a high-budget campaign. Our audience retention has never been this strong.',
                'author' => 'Marcus Thorne',
                'role' => 'Creative Director, Aura Paris',
                'rating' => 5,
                'company_name' => 'AURA',
            ],
            [
                'id' => 'rev-3',
                'quote' => 'Best creative team we\'ve worked with. Period. Their understanding of narrative structure and brand positioning is on another level compared to other agencies.',
                'author' => 'Solomon Kray',
                'role' => 'Founder, Synergy Group',
                'rating' => 5,
                'company_name' => 'SYNERGY',
            ],
            [
                'id' => 'rev-4',
                'quote' => 'Working with Brandjo Media allowed us to launch our new product line with a bang. The pre-launch content strategy alone generated massive anticipation.',
                'author' => 'Zarah Chen',
                'role' => 'Co-Founder, Vertex Systems',
                'rating' => 5,
                'company_name' => 'VERTEX',
            ],
        ],
        'video_testimonials' => [
            ['client' => 'Synthetix Labs', 'role' => 'Founder video testimonial', 'duration' => '00:48', 'youtube_id' => 'dQw4w9WgXcQ'],
            ['client' => 'Aura Paris', 'role' => 'Campaign result testimonial', 'duration' => '01:12', 'youtube_id' => 'RgKAFK5djSk'],
            ['client' => 'Synergy Group', 'role' => 'Growth partner testimonial', 'duration' => '00:56', 'youtube_id' => 'JGwWNGJdvx8'],
            ['client' => 'Vertex Systems', 'role' => 'Launch authority testimonial', 'duration' => '01:05', 'youtube_id' => 'hT_nvWreIhg'],
            ['client' => 'Nexus Agency', 'role' => 'Creative director testimonial', 'duration' => '00:52', 'youtube_id' => 'OPf0YbXqDm0'],
        ],
    ], 'option');

    // -- Pricing --
    update_field('pricing', [
        'section_header' => 'PRICING SYSTEMS',
        'section_title' => 'Pre-Engineered Retainer Slots.',
        'billed_monthly' => 'Billed Monthly',
        'billed_annually' => 'Billed Annually',
        'footnote' => '*Retainer structures require a mutual 3-month trial commitment. Custom enterprise parameters discussed upon request.',
        'tiers' => [
            [
                'id' => 'p-starter',
                'name' => 'Starter',
                'price' => '4,500',
                'description' => 'Perfect for high-potential startups and founders establishing authority.',
                'features' => [
                    ['feature' => '1 Custom Content Archetype Blueprint'],
                    ['feature' => '8 Custom Cinematic Video Assets'],
                    ['feature' => 'Weekly Copywriting & Scripts'],
                    ['feature' => 'Core Tone of Voice Guide Setup'],
                    ['feature' => 'Dedicated Content Manager Link'],
                    ['feature' => 'Slack Collaboration Access'],
                ],
                'popular' => false,
                'cta_text' => 'Get Starter Suite',
            ],
            [
                'id' => 'p-growth',
                'name' => 'Growth',
                'price' => '8,500',
                'description' => 'Our flagship setup that fully scales social reach and brand prestige.',
                'features' => [
                    ['feature' => '3 Custom Content Archetypes Blueprint'],
                    ['feature' => '18 Custom Cinematic Video Assets'],
                    ['feature' => 'Daily Multichannel Copywriting'],
                    ['feature' => 'Complete Visual Brand Identity Redesign'],
                    ['feature' => 'Fictional Brand Collaboration Hooking'],
                    ['feature' => 'Creative Paid Advertising Strategy'],
                    ['feature' => 'Bi-Weekly Strategy Calls'],
                    ['feature' => '24/7 Priority Channel Support'],
                ],
                'popular' => true,
                'badge' => 'MOST POPULAR',
                'cta_text' => 'Scale My Brand',
            ],
            [
                'id' => 'p-dominance',
                'name' => 'Dominance',
                'price' => '15,000',
                'description' => 'A total creative takeover for market leaders aiming to rewrite the rules completely.',
                'features' => [
                    ['feature' => 'Unlimited Cinematic Video Deliverables'],
                    ['feature' => 'Omnichannel Multi-platform Distribution Systems'],
                    ['feature' => 'Complete Brand Strategy & Positioning Consulting'],
                    ['feature' => 'Bespoke Abstract 3D Render Assets Created'],
                    ['feature' => 'Dedicated Full-time Creative Director Integration'],
                    ['feature' => 'Full Funnel Lead Attribution Setup'],
                    ['feature' => 'Weekly Progress Audits & Direct CEO Hotlines'],
                    ['feature' => 'Unmatched Performance-backed Growth Commitments'],
                ],
                'popular' => false,
                'badge' => 'ENTERPRISE ELITE',
                'cta_text' => 'Secure Absolute Domination',
            ],
        ],
    ], 'option');

    // -- FAQ --
    update_field('faq', [
        'section_header' => 'KNOWLEDGE GRID',
        'section_title' => 'Frequently Answered Questions.',
        'support_callout' => 'Have other proprietary questions?',
        'support_subtext' => 'Our executive partners are active in managing corporate inquiry streams.',
        'support_cta' => 'Ask Executive Team',
        'items' => [
            [
                'id' => 'faq-1',
                'question' => 'What services does Brandjo Media provide?',
                'answer' => 'We are a full-service content growth agency specializing in cinematic video production, brand strategy, social media growth systems, and paid advertising creative. Our expertise spans across premium brand storytelling, high-retention short-form and long-form content, and performance-driven marketing funnels.',
                'category' => 'Services',
            ],
            [
                'id' => 'faq-2',
                'question' => 'How long does a project take to launch?',
                'answer' => 'Our initial auditing and blueprinting phase typically takes 5-7 business days. After approval, content production begins immediately, with the first deliverables ready within the first week of the retainer cycle.',
                'category' => 'Process',
            ],
            [
                'id' => 'faq-3',
                'question' => 'Do you work with international clients?',
                'answer' => 'Absolutely. We are a distributed team operating across Paris, London, and Dhaka. We collaborate with clients globally through Slack, Notion, Asana, and weekly video strategy calls across all time zones.',
                'category' => 'Scope',
            ],
            [
                'id' => 'faq-4',
                'question' => 'Can you handle end-to-end content strategy?',
                'answer' => 'Yes, this is our key specialty. We don\'t just edit videos — we build complete content ecosystems from brand positioning and audience analysis through production, distribution, and paid amplification.',
                'category' => 'Strategy',
            ],
            [
                'id' => 'faq-5',
                'question' => 'What platforms do you specialize in?',
                'answer' => 'Our content engines are optimized primarily for TikTok, Instagram Reels, YouTube (both shorts and long-form), and LinkedIn. We also produce assets for X/Twitter and emerging platforms upon request.',
                'category' => 'Platforms',
            ],
            [
                'id' => 'faq-6',
                'question' => 'How do we get started with Brandjo Media?',
                'answer' => 'Simply click Book a Call or reach out at directors@brandjo.media. We will schedule a strategy audit call to discuss your brand\'s current positioning, goals, and whether our retainer model is the right fit.',
                'category' => 'Onboarding',
            ],
        ],
    ], 'option');

    // -- Intro Video --
    update_field('intro_video', [
        'section_header' => 'EXECUTIVE BRIEF',
        'section_title' => 'See How We Build Attention.',
        'description' => 'We bypass traditional advertising hurdles. By introducing a rigid pipeline of custom content strategy, high-fidelity video editing, brand positioning elements, and automatic organic distribution systems, we scale user authority organically.',
        'youtube_url' => 'https://www.youtube.com/watch?v=fwOnVwdbTFo',
        'duration' => '1 min 24 sec',
    ], 'option');

    // -- Final CTA --
    update_field('final_cta', [
        'headline' => 'Your Brand Deserves More Attention.',
        'subheadline' => 'Let\'s build content people actually remember. Stop burning resources on low-retention updates. Harness high-fidelity cinematic video engines and custom conversion matrices instead.',
        'button_text' => 'Book Your Strategy Call',
        'limit_text' => 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
    ], 'option');

    // -- Footer --
    update_field('footer', [
        'email' => 'directors@brandjo.media',
        'studio_location' => 'Creative Studio Paris / London Soho Hub - Operating Worldwide',
        'copyright' => '© ' . date('Y') . ' Brandjo Media. All rights reserved.',
    ], 'option');

    // -- Buttons --
    update_field('buttons', [
        'navbar_book_call_text' => 'Book a Call',
        'navbar_book_call_url' => '',
        'hero_cta_primary_text' => 'Start Your Brand',
        'hero_cta_primary_url' => '',
        'hero_cta_secondary_text' => 'View Projects',
        'hero_cta_secondary_url' => '#projects',
        'hero_scroll_text' => 'DISCOVER THE MOVEMENT',
        'hero_scroll_url' => '#video-reel',
        'intro_video_play_text' => 'Launch Cinematic Reel',
        'projects_watch_label' => 'Watch the Project',
        'final_cta_button_text' => 'Book Your Strategy Call',
        'final_cta_button_url' => '',
        'final_cta_limit_text' => 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
        'faq_support_cta_text' => 'Ask Executive Team',
        'faq_support_cta_url' => '#contact',
    ], 'option');

    // Mark import as done
    update_option('brandjo_acf_imported', true);
}

// ============================================================
// 6. wpData JSON BUILDER
// ============================================================
function brandjo_get_wp_data_json() {
    $data = [];

    // -- Site Basics --
    $data['siteName'] = get_field('site_name', 'option') ?: 'Brandjo Media';
    $data['siteDescription'] = get_field('site_description', 'option') ?: 'Premium video editing and brand strategy agency.';
    $data['siteUrl'] = get_site_url();
    $data['themeUri'] = BRANDJO_THEME_URI;
    $data['ajaxUrl'] = admin_url('admin-ajax.php');
    $data['restUrl'] = get_rest_url();
    $data['nonce'] = wp_create_nonce('wp_rest');

    // -- Nav Links --
    $nav = get_field('nav_links', 'option');
    $data['navLinks'] = [];
    if (!empty($nav)) {
        foreach ($nav as $link) {
            $data['navLinks'][] = [
                'name' => $link['name'] ?? '',
                'href' => $link['href'] ?? '#',
            ];
        }
    }
    if (empty($data['navLinks'])) {
        $data['navLinks'] = [
            ['name' => 'Home', 'href' => '#home'],
            ['name' => 'Services', 'href' => '#services'],
            ['name' => 'Projects', 'href' => '#projects'],
            ['name' => 'Pricing', 'href' => '#pricing'],
            ['name' => 'FAQ', 'href' => '#faq'],
            ['name' => 'Contact', 'href' => '#contact'],
        ];
    }

    // -- Social Links --
    $social = get_field('social_links', 'option');
    $data['socialLinks'] = [];
    if (!empty($social)) {
        foreach ($social as $s) {
            $platform = $s['platform'] ?? '';
            $url = $s['url'] ?? '';
            if ($platform && $url) {
                $data['socialLinks'][$platform] = $url;
            }
        }
    }
    if (empty($data['socialLinks'])) {
        $data['socialLinks'] = [
            'linkedin' => 'https://linkedin.com',
            'twitter' => 'https://twitter.com',
            'instagram' => 'https://instagram.com',
            'youtube' => 'https://youtube.com',
        ];
    }

    // -- Contact / Footer --
    $data['email'] = get_field('email', 'option') ?: 'directors@brandjo.media';
    $data['studioLocation'] = get_field('studio_location', 'option') ?: 'Creative Studio Paris / London Soho Hub - Operating Worldwide';
    $data['copyright'] = get_field('copyright', 'option') ?: '© ' . date('Y') . ' Brandjo Media. All rights reserved.';

    // -- Hero --
    $hero = get_field('hero', 'option');
    if (!empty($hero)) {
        $data['hero'] = [
            'headline' => $hero['headline'] ?? 'Content That Makes Brands',
            'headlineHighlight' => $hero['headline_highlight'] ?? 'Impossible to Ignore.',
            'subheadline' => $hero['subheadline'] ?? '',
            'ctaPrimary' => $hero['cta_primary'] ?? 'Start Your Brand',
            'ctaSecondary' => $hero['cta_secondary'] ?? 'View Projects',
            'scrollText' => $hero['scroll_text'] ?? 'DISCOVER THE MOVEMENT',
            'stats' => [],
        ];
        if (!empty($hero['stats'])) {
            foreach ($hero['stats'] as $stat) {
                $data['hero']['stats'][] = [
                    'value' => $stat['value'] ?? '',
                    'label' => $stat['label'] ?? '',
                    'description' => $stat['description'] ?? '',
                ];
            }
        }
        if (empty($data['hero']['stats'])) {
            $data['hero']['stats'] = [
                ['value' => '120M+', 'label' => 'Views Generated', 'description' => 'Through strategic, high-retention cinematic concepts.'],
                ['value' => '50+', 'label' => 'Brands Scaled', 'description' => 'Enterprise SaaS, luxury fashion, and elite personal networks.'],
                ['value' => '4.9', 'label' => 'Client Satisfaction', 'description' => 'Uncompromising service standards and real revenue ROI.'],
            ];
        }
    } else {
        $data['hero'] = null;
    }

    // -- Services --
    $services = get_field('services', 'option');
    if (!empty($services)) {
        $data['services'] = [
            'sectionHeader' => $services['section_header'] ?? 'SPECIALIZED CAPABILITIES',
            'sectionTitle' => $services['section_title'] ?? 'A Complete Brand Growth Architecture.',
            'sectionSubtext' => $services['section_subtext'] ?? '',
            'items' => [],
        ];
        if (!empty($services['items'])) {
            foreach ($services['items'] as $item) {
                $benefits = [];
                if (!empty($item['benefits'])) {
                    foreach ($item['benefits'] as $b) {
                        $benefits[] = $b['benefit'] ?? '';
                    }
                }
                $data['services']['items'][] = [
                    'id' => $item['id'] ?? '',
                    'title' => $item['title'] ?? '',
                    'description' => $item['description'] ?? '',
                    'iconName' => $item['icon_name'] ?? 'FileText',
                    'benefits' => $benefits,
                ];
            }
        }
    } else {
        $data['services'] = null;
    }

    // -- About --
    $about = get_field('about', 'option');
    if (!empty($about)) {
        $manifesto = [];
        if (!empty($about['manifesto'])) {
            foreach ($about['manifesto'] as $p) {
                $manifesto[] = $p['paragraph'] ?? '';
            }
        }
        $stats = [];
        if (!empty($about['stats'])) {
            foreach ($about['stats'] as $s) {
                $stats[] = [
                    'value' => $s['value'] ?? '',
                    'label' => $s['label'] ?? '',
                ];
            }
        }
        $workflow = [];
        if (!empty($about['workflow'])) {
            foreach ($about['workflow'] as $w) {
                $workflow[] = [
                    'id' => $w['id'] ?? '',
                    'year' => $w['year'] ?? '',
                    'title' => $w['title'] ?? '',
                    'description' => $w['description'] ?? '',
                ];
            }
        }
        $data['about'] = [
            'manifesto' => $manifesto,
            'stats' => $stats,
            'qualityBadge' => $about['quality_badge'] ?? 'Elite Creative Production Standards - No stock elements, no cookie-cutter templates, no exceptions.',
            'workflow' => $workflow,
        ];
    } else {
        $data['about'] = null;
    }

    // -- Projects --
    $projects = get_field('projects', 'option');
    if (!empty($projects)) {
        $cats = [];
        if (!empty($projects['categories'])) {
            foreach ($projects['categories'] as $c) {
                $cats[] = $c['category'] ?? '';
            }
        }
        $items = [];
        if (!empty($projects['items'])) {
            foreach ($projects['items'] as $p) {
                $videoFile = $p['video_file'] ?? '';
                $items[] = [
                    'id' => $p['id'] ?? '',
                    'title' => $p['title'] ?? '',
                    'videoFile' => $videoFile ?: '',
                    'videoId' => $p['video_id'] ?? 'dQw4w9WgXcQ',
                    'description' => $p['description'] ?? '',
                    'category' => $p['category'] ?? '',
                    'client' => $p['client'] ?? '',
                    'metrics' => $p['metrics'] ?? '',
                ];
            }
        }
        $data['projects'] = [
            'sectionHeader' => $projects['section_header'] ?? 'PORTFOLIO',
            'sectionTitle' => $projects['section_title'] ?? 'Projects.',
            'categories' => $cats,
            'items' => $items,
        ];
    } else {
        $data['projects'] = null;
    }

    // -- Reviews / Testimonials --
    $reviews = get_field('reviews', 'option');
    if (!empty($reviews)) {
        $items = [];
        if (!empty($reviews['items'])) {
            foreach ($reviews['items'] as $r) {
                $items[] = [
                    'id' => $r['id'] ?? '',
                    'quote' => $r['quote'] ?? '',
                    'author' => $r['author'] ?? '',
                    'role' => $r['role'] ?? '',
                    'rating' => (int)($r['rating'] ?? 5),
                    'companyName' => $r['company_name'] ?? '',
                ];
            }
        }
        $videos = [];
        if (!empty($reviews['video_testimonials'])) {
            foreach ($reviews['video_testimonials'] as $v) {
                $videoFile = $v['video_file'] ?? '';
                $videos[] = [
                    'client' => $v['client'] ?? '',
                    'role' => $v['role'] ?? '',
                    'duration' => $v['duration'] ?? '00:00',
                    'videoFile' => $videoFile ?: '',
                    'youtubeId' => $v['youtube_id'] ?? 'dQw4w9WgXcQ',
                ];
            }
        }
        $data['reviews'] = [
            'items' => $items,
            'videoTestimonials' => $videos,
        ];
    } else {
        $data['reviews'] = null;
    }

    // -- Pricing --
    $pricing = get_field('pricing', 'option');
    if (!empty($pricing)) {
        $tiers = [];
        if (!empty($pricing['tiers'])) {
            foreach ($pricing['tiers'] as $t) {
                $features = [];
                if (!empty($t['features'])) {
                    foreach ($t['features'] as $f) {
                        $features[] = $f['feature'] ?? '';
                    }
                }
                $tiers[] = [
                    'id' => $t['id'] ?? '',
                    'name' => $t['name'] ?? '',
                    'price' => $t['price'] ?? '0',
                    'description' => $t['description'] ?? '',
                    'features' => $features,
                    'popular' => !empty($t['popular']),
                    'badge' => $t['badge'] ?? '',
                    'ctaText' => $t['cta_text'] ?? 'Get Started',
                ];
            }
        }
        $data['pricing'] = [
            'sectionHeader' => $pricing['section_header'] ?? 'PRICING SYSTEMS',
            'sectionTitle' => $pricing['section_title'] ?? 'Pre-Engineered Retainer Slots.',
            'billedMonthly' => $pricing['billed_monthly'] ?? 'Billed Monthly',
            'billedAnnually' => $pricing['billed_annually'] ?? 'Billed Annually',
            'footnote' => $pricing['footnote'] ?? '',
            'tiers' => $tiers,
        ];
    } else {
        $data['pricing'] = null;
    }

    // -- FAQ --
    $faq = get_field('faq', 'option');
    if (!empty($faq)) {
        $items = [];
        if (!empty($faq['items'])) {
            foreach ($faq['items'] as $f) {
                $items[] = [
                    'id' => $f['id'] ?? '',
                    'question' => $f['question'] ?? '',
                    'answer' => $f['answer'] ?? '',
                    'category' => $f['category'] ?? 'General',
                ];
            }
        }
        $data['faq'] = [
            'sectionHeader' => $faq['section_header'] ?? 'KNOWLEDGE GRID',
            'sectionTitle' => $faq['section_title'] ?? 'Frequently Answered Questions.',
            'supportCallout' => $faq['support_callout'] ?? 'Have other proprietary questions?',
            'supportSubtext' => $faq['support_subtext'] ?? 'Our executive partners are active in managing corporate inquiry streams.',
            'supportCta' => $faq['support_cta'] ?? 'Ask Executive Team',
            'items' => $items,
        ];
    } else {
        $data['faq'] = null;
    }

    // -- Final CTA --
    $finalCta = get_field('final_cta', 'option');
    if (!empty($finalCta)) {
        $data['finalCta'] = [
            'headline' => $finalCta['headline'] ?? 'Your Brand Deserves More Attention.',
            'subheadline' => $finalCta['subheadline'] ?? '',
            'buttonText' => $finalCta['button_text'] ?? 'Book Your Strategy Call',
            'limitText' => $finalCta['limit_text'] ?? 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
        ];
    } else {
        $data['finalCta'] = null;
    }

    // -- Intro Video --
    $introVideo = get_field('intro_video', 'option');
    if (!empty($introVideo)) {
        $youtubeUrl = $introVideo['youtube_url'] ?? '';
        $youtubeId = '';
        if ($youtubeUrl) {
            preg_match('/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/', $youtubeUrl, $matches);
            if (!empty($matches[1])) {
                $youtubeId = $matches[1];
            }
        }
        $videoFile = $introVideo['video_file'] ?? '';
        $data['introVideo'] = [
            'sectionHeader' => $introVideo['section_header'] ?? 'EXECUTIVE BRIEF',
            'sectionTitle' => $introVideo['section_title'] ?? 'See How We Build Attention.',
            'description' => $introVideo['description'] ?? '',
            'videoFile' => $videoFile ?: '',
            'youtubeId' => $youtubeId ?: 'fwOnVwdbTFo',
            'playButtonText' => 'Launch Cinematic Reel',
            'duration' => $introVideo['duration'] ?? '1 min 24 sec',
            'floatingNodes' => [],
        ];
    } else {
        $data['introVideo'] = null;
    }

    // -- Footer --
    $footer = get_field('footer', 'option');
    if (!empty($footer)) {
        $data['email'] = $footer['email'] ?: $data['email'];
        $data['studioLocation'] = $footer['studio_location'] ?: $data['studioLocation'];
        $data['copyright'] = $footer['copyright'] ?: $data['copyright'];
    }

    // -- Button Settings --
    $buttons = get_field('buttons', 'option');
    if (!empty($buttons)) {
        $bs = $data['buttonSettings'] = [
            'navbarBookCallText' => $buttons['navbar_book_call_text'] ?? 'Book a Call',
            'navbarBookCallUrl' => $buttons['navbar_book_call_url'] ?? '',
            'heroCtaPrimaryText' => $buttons['hero_cta_primary_text'] ?? 'Start Your Brand',
            'heroCtaPrimaryUrl' => $buttons['hero_cta_primary_url'] ?? '',
            'heroCtaSecondaryText' => $buttons['hero_cta_secondary_text'] ?? 'View Projects',
            'heroCtaSecondaryUrl' => $buttons['hero_cta_secondary_url'] ?? '#projects',
            'heroScrollText' => $buttons['hero_scroll_text'] ?? 'DISCOVER THE MOVEMENT',
            'heroScrollUrl' => $buttons['hero_scroll_url'] ?? '#video-reel',
            'introVideoPlayText' => $buttons['intro_video_play_text'] ?? 'Launch Cinematic Reel',
            'projectsWatchLabel' => $buttons['projects_watch_label'] ?? 'Watch the Project',
            'finalCtaButtonText' => $buttons['final_cta_button_text'] ?? 'Book Your Strategy Call',
            'finalCtaButtonUrl' => $buttons['final_cta_button_url'] ?? '',
            'finalCtaLimitText' => $buttons['final_cta_limit_text'] ?? 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
            'faqSupportCtaText' => $buttons['faq_support_cta_text'] ?? 'Ask Executive Team',
            'faqSupportCtaUrl' => $buttons['faq_support_cta_url'] ?? '#contact',
        ];
        // Merge button settings into existing section data for backward compatibility
        if (isset($data['hero'])) {
            $data['hero']['ctaPrimary'] = $bs['heroCtaPrimaryText'];
            $data['hero']['ctaSecondary'] = $bs['heroCtaSecondaryText'];
            $data['hero']['scrollText'] = $bs['heroScrollText'];
        }
        if (isset($data['finalCta'])) {
            $data['finalCta']['buttonText'] = $bs['finalCtaButtonText'];
            $data['finalCta']['limitText'] = $bs['finalCtaLimitText'];
        }
        if (isset($data['faq'])) {
            $data['faq']['supportCta'] = $bs['faqSupportCtaText'];
        }
    } else {
        $data['buttonSettings'] = null;
    }

    return json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
