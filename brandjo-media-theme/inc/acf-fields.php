<?php
if (!defined('ABSPATH')) exit;
if (!function_exists('acf_add_local_field_group')) return;

// ============================================================
// 1. GLOBAL SETTINGS
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_global',
    'title' => 'Global Settings',
    'fields' => [
        [
            'key' => 'brandjo_global_tab_site',
            'label' => 'Site',
            'type' => 'tab',
        ],
        [
            'key' => 'brandjo_site_name',
            'label' => 'Site Name',
            'name' => 'site_name',
            'type' => 'text',
            'default_value' => 'Brandjo Media',
        ],
        [
            'key' => 'brandjo_site_description',
            'label' => 'Site Description',
            'name' => 'site_description',
            'type' => 'textarea',
            'default_value' => 'Premium video editing and brand strategy agency.',
        ],
        [
            'key' => 'brandjo_nav_links',
            'label' => 'Navigation Links',
            'name' => 'nav_links',
            'type' => 'repeater',
            'layout' => 'table',
            'button_label' => 'Add Link',
            'sub_fields' => [
                [
                    'key' => 'brandjo_nav_name',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'required' => 1,
                ],
                [
                    'key' => 'brandjo_nav_href',
                    'label' => 'Href',
                    'name' => 'href',
                    'type' => 'text',
                    'default_value' => '#',
                    'required' => 1,
                ],
            ],
        ],
        [
            'key' => 'brandjo_global_tab_social',
            'label' => 'Social Links',
            'type' => 'tab',
        ],
        [
            'key' => 'brandjo_social_links',
            'label' => 'Social Links',
            'name' => 'social_links',
            'type' => 'repeater',
            'layout' => 'table',
            'button_label' => 'Add Social Link',
            'sub_fields' => [
                [
                    'key' => 'brandjo_social_platform',
                    'label' => 'Platform',
                    'name' => 'platform',
                    'type' => 'select',
                    'choices' => [
                        'linkedin' => 'LinkedIn',
                        'twitter' => 'Twitter / X',
                        'instagram' => 'Instagram',
                        'youtube' => 'YouTube',
                    ],
                    'required' => 1,
                ],
                [
                    'key' => 'brandjo_social_url',
                    'label' => 'URL',
                    'name' => 'url',
                    'type' => 'url',
                    'required' => 1,
                ],
            ],
        ],
        [
            'key' => 'brandjo_global_tab_contact',
            'label' => 'Contact & Footer',
            'type' => 'tab',
        ],
        [
            'key' => 'brandjo_email',
            'label' => 'Email',
            'name' => 'email',
            'type' => 'email',
            'default_value' => 'directors@brandjo.media',
        ],
        [
            'key' => 'brandjo_studio_location',
            'label' => 'Studio Location',
            'name' => 'studio_location',
            'type' => 'text',
            'default_value' => 'Creative Studio Paris / London Soho Hub - Operating Worldwide',
        ],
        [
            'key' => 'brandjo_copyright',
            'label' => 'Copyright Text',
            'name' => 'copyright',
            'type' => 'text',
            'default_value' => '© ' . date('Y') . ' Brandjo Media. All rights reserved.',
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-global',
            ],
        ],
    ],
]);

// ============================================================
// 2. HERO SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_hero',
    'title' => 'Hero Section',
    'fields' => [
        [
            'key' => 'brandjo_hero_group',
            'label' => 'Hero Content',
            'name' => 'hero',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_hero_headline',
                    'label' => 'Headline',
                    'name' => 'headline',
                    'type' => 'text',
                    'default_value' => 'Content That Makes Brands',
                ],
                [
                    'key' => 'brandjo_hero_headline_highlight',
                    'label' => 'Headline Highlight (gradient text)',
                    'name' => 'headline_highlight',
                    'type' => 'text',
                    'default_value' => 'Impossible to Ignore.',
                ],
                [
                    'key' => 'brandjo_hero_subheadline',
                    'label' => 'Subheadline',
                    'name' => 'subheadline',
                    'type' => 'textarea',
                    'default_value' => 'We help premium brands grow scaling attention through cinematic content, high-value strategic storytelling, and performance-driven growth marketing systems.',
                ],
                [
                    'key' => 'brandjo_hero_cta_primary',
                    'label' => 'Primary CTA Text',
                    'name' => 'cta_primary',
                    'type' => 'text',
                    'default_value' => 'Start Your Brand',
                ],
                [
                    'key' => 'brandjo_hero_cta_secondary',
                    'label' => 'Secondary CTA Text',
                    'name' => 'cta_secondary',
                    'type' => 'text',
                    'default_value' => 'View Projects',
                ],
                [
                    'key' => 'brandjo_hero_scroll_text',
                    'label' => 'Scroll Indicator Text',
                    'name' => 'scroll_text',
                    'type' => 'text',
                    'default_value' => 'DISCOVER THE MOVEMENT',
                ],
                [
                    'key' => 'brandjo_hero_stats',
                    'label' => 'Hero Stats',
                    'name' => 'stats',
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Add Stat',
                    'min' => 0,
                    'max' => 6,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_hero_stat_value',
                            'label' => 'Value',
                            'name' => 'value',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_hero_stat_label',
                            'label' => 'Label',
                            'name' => 'label',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_hero_stat_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-hero',
            ],
        ],
    ],
]);

// ============================================================
// 3. SERVICES SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_services',
    'title' => 'Services Section',
    'fields' => [
        [
            'key' => 'brandjo_services_group',
            'label' => 'Services Content',
            'name' => 'services',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_services_header',
                    'label' => 'Section Header',
                    'name' => 'section_header',
                    'type' => 'text',
                    'default_value' => 'SPECIALIZED CAPABILITIES',
                ],
                [
                    'key' => 'brandjo_services_title',
                    'label' => 'Section Title',
                    'name' => 'section_title',
                    'type' => 'text',
                    'default_value' => 'A Complete Brand Growth Architecture.',
                ],
                [
                    'key' => 'brandjo_services_subtext',
                    'label' => 'Section Subtext',
                    'name' => 'section_subtext',
                    'type' => 'textarea',
                    'default_value' => 'We don\'t sell hours or simple generic edits. We build high-throughput creative systems that integrate premium storytelling directly into qualified lead generation.',
                ],
                [
                    'key' => 'brandjo_services_items',
                    'label' => 'Service Items',
                    'name' => 'items',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Service',
                    'min' => 0,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_service_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                            'instructions' => 'Unique identifier (e.g. content-marketing)',
                        ],
                        [
                            'key' => 'brandjo_service_title',
                            'label' => 'Title',
                            'name' => 'title',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_service_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_service_icon',
                            'label' => 'Icon Name',
                            'name' => 'icon_name',
                            'type' => 'select',
                            'choices' => [
                                'FileText' => 'FileText (Content)',
                                'Video' => 'Video (Editing)',
                                'Compass' => 'Compass (Strategy)',
                                'TrendingUp' => 'TrendingUp (Growth)',
                                'Sparkles' => 'Sparkles (Creative)',
                                'Activity' => 'Activity (Advertising)',
                            ],
                            'default_value' => 'FileText',
                        ],
                        [
                            'key' => 'brandjo_service_benefits',
                            'label' => 'Benefits',
                            'name' => 'benefits',
                            'type' => 'repeater',
                            'layout' => 'table',
                            'button_label' => 'Add Benefit',
                            'min' => 0,
                            'sub_fields' => [
                                [
                                    'key' => 'brandjo_service_benefit',
                                    'label' => 'Benefit',
                                    'name' => 'benefit',
                                    'type' => 'text',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-services',
            ],
        ],
    ],
]);

// ============================================================
// 4. ABOUT SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_about',
    'title' => 'About Section',
    'fields' => [
        [
            'key' => 'brandjo_about_group',
            'label' => 'About Content',
            'name' => 'about',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_about_manifesto',
                    'label' => 'Manifesto Paragraphs',
                    'name' => 'manifesto',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Paragraph',
                    'min' => 0,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_about_paragraph',
                            'label' => 'Paragraph Text',
                            'name' => 'paragraph',
                            'type' => 'textarea',
                        ],
                    ],
                ],
                [
                    'key' => 'brandjo_about_stats',
                    'label' => 'Stats',
                    'name' => 'stats',
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Add Stat',
                    'min' => 0,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_about_stat_value',
                            'label' => 'Value',
                            'name' => 'value',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_about_stat_label',
                            'label' => 'Label',
                            'name' => 'label',
                            'type' => 'text',
                            'required' => 1,
                        ],
                    ],
                ],
                [
                    'key' => 'brandjo_about_quality_badge',
                    'label' => 'Quality Badge Text',
                    'name' => 'quality_badge',
                    'type' => 'text',
                    'default_value' => 'Elite Creative Production Standards - No stock elements, no cookie-cutter templates, no exceptions.',
                ],
                [
                    'key' => 'brandjo_about_workflow',
                    'label' => 'Workflow Timeline',
                    'name' => 'workflow',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Phase',
                    'min' => 0,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_workflow_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_workflow_year',
                            'label' => 'Phase Label',
                            'name' => 'year',
                            'type' => 'text',
                            'instructions' => 'e.g. Phase 1: Diagnosis',
                        ],
                        [
                            'key' => 'brandjo_workflow_title',
                            'label' => 'Title',
                            'name' => 'title',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_workflow_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                            'required' => 1,
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-about',
            ],
        ],
    ],
]);

// ============================================================
// 5. PROJECTS / PORTFOLIO
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_projects',
    'title' => 'Projects / Portfolio',
    'fields' => [
        [
            'key' => 'brandjo_projects_group',
            'label' => 'Projects Content',
            'name' => 'projects',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_projects_header',
                    'label' => 'Section Header',
                    'name' => 'section_header',
                    'type' => 'text',
                    'default_value' => 'PORTFOLIO',
                ],
                [
                    'key' => 'brandjo_projects_title',
                    'label' => 'Section Title',
                    'name' => 'section_title',
                    'type' => 'text',
                    'default_value' => 'Projects.',
                ],
                [
                    'key' => 'brandjo_projects_categories',
                    'label' => 'Categories',
                    'name' => 'categories',
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Add Category',
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_project_category',
                            'label' => 'Category Name',
                            'name' => 'category',
                            'type' => 'text',
                        ],
                    ],
                ],
                [
                    'key' => 'brandjo_projects_items',
                    'label' => 'Project Items',
                    'name' => 'items',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Project',
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_project_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_project_title',
                            'label' => 'Title',
                            'name' => 'title',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_project_video_file',
                            'label' => 'Video File (Media Library)',
                            'name' => 'video_file',
                            'type' => 'file',
                            'return_format' => 'url',
                            'library' => 'all',
                            'instructions' => 'Upload a video file from the Media Library (MP4 recommended).',
                            'required' => 0,
                        ],
                        [
                            'key' => 'brandjo_project_video_id',
                            'label' => 'YouTube Video ID',
                            'name' => 'video_id',
                            'type' => 'text',
                            'instructions' => 'YouTube video ID (e.g. dQw4w9WgXcQ) — leave empty if using file upload above.',
                        ],
                        [
                            'key' => 'brandjo_project_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                        ],
                        [
                            'key' => 'brandjo_project_category',
                            'label' => 'Category',
                            'name' => 'category',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_project_client',
                            'label' => 'Client',
                            'name' => 'client',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_project_metrics',
                            'label' => 'Metrics',
                            'name' => 'metrics',
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-projects',
            ],
        ],
    ],
]);

// ============================================================
// 6. TESTIMONIALS / REVIEWS
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_testimonials',
    'title' => 'Testimonials / Reviews',
    'fields' => [
        [
            'key' => 'brandjo_reviews_group',
            'label' => 'Reviews Content',
            'name' => 'reviews',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_review_items',
                    'label' => 'Text Reviews',
                    'name' => 'items',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Review',
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_review_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_review_quote',
                            'label' => 'Quote',
                            'name' => 'quote',
                            'type' => 'textarea',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_review_author',
                            'label' => 'Author',
                            'name' => 'author',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_review_role',
                            'label' => 'Role',
                            'name' => 'role',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_review_rating',
                            'label' => 'Rating',
                            'name' => 'rating',
                            'type' => 'number',
                            'min' => 1,
                            'max' => 5,
                            'default_value' => 5,
                        ],
                        [
                            'key' => 'brandjo_review_company',
                            'label' => 'Company Name',
                            'name' => 'company_name',
                            'type' => 'text',
                        ],
                    ],
                ],
                [
                    'key' => 'brandjo_review_videos',
                    'label' => 'Video Testimonials',
                    'name' => 'video_testimonials',
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Add Video Testimonial',
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_review_video_client',
                            'label' => 'Client Name',
                            'name' => 'client',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_review_video_role',
                            'label' => 'Role',
                            'name' => 'role',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_review_video_duration',
                            'label' => 'Duration',
                            'name' => 'duration',
                            'type' => 'text',
                            'instructions' => 'e.g. 00:48',
                        ],
                        [
                            'key' => 'brandjo_review_video_file',
                            'label' => 'Video File (Media Library)',
                            'name' => 'video_file',
                            'type' => 'file',
                            'return_format' => 'url',
                            'library' => 'all',
                            'instructions' => 'Upload a video file from the Media Library (MP4 recommended).',
                            'required' => 0,
                        ],
                        [
                            'key' => 'brandjo_review_video_youtube',
                            'label' => 'YouTube Video ID',
                            'name' => 'youtube_id',
                            'type' => 'text',
                            'instructions' => 'YouTube video ID — leave empty if using file upload above.',
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-testimonials',
            ],
        ],
    ],
]);

// ============================================================
// 7. PRICING SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_pricing',
    'title' => 'Pricing Section',
    'fields' => [
        [
            'key' => 'brandjo_pricing_group',
            'label' => 'Pricing Content',
            'name' => 'pricing',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_pricing_header',
                    'label' => 'Section Header',
                    'name' => 'section_header',
                    'type' => 'text',
                    'default_value' => 'PRICING SYSTEMS',
                ],
                [
                    'key' => 'brandjo_pricing_title',
                    'label' => 'Section Title',
                    'name' => 'section_title',
                    'type' => 'text',
                    'default_value' => 'Pre-Engineered Retainer Slots.',
                ],
                [
                    'key' => 'brandjo_pricing_billed_monthly',
                    'label' => 'Billed Monthly Label',
                    'name' => 'billed_monthly',
                    'type' => 'text',
                    'default_value' => 'Billed Monthly',
                ],
                [
                    'key' => 'brandjo_pricing_billed_annually',
                    'label' => 'Billed Annually Label',
                    'name' => 'billed_annually',
                    'type' => 'text',
                    'default_value' => 'Billed Annually',
                ],
                [
                    'key' => 'brandjo_pricing_footnote',
                    'label' => 'Footnote',
                    'name' => 'footnote',
                    'type' => 'textarea',
                    'default_value' => '*Retainer structures require a mutual 3-month trial commitment. Custom enterprise parameters discussed upon request.',
                ],
                [
                    'key' => 'brandjo_pricing_tiers',
                    'label' => 'Pricing Tiers',
                    'name' => 'tiers',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add Pricing Tier',
                    'min' => 0,
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_tier_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_tier_name',
                            'label' => 'Name',
                            'name' => 'name',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_tier_price',
                            'label' => 'Price',
                            'name' => 'price',
                            'type' => 'text',
                            'instructions' => 'Numeric with comma (e.g. 4,500)',
                            'default_value' => '4,500',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_tier_description',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'textarea',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_tier_features',
                            'label' => 'Features',
                            'name' => 'features',
                            'type' => 'repeater',
                            'layout' => 'table',
                            'button_label' => 'Add Feature',
                            'sub_fields' => [
                                [
                                    'key' => 'brandjo_tier_feature',
                                    'label' => 'Feature Text',
                                    'name' => 'feature',
                                    'type' => 'text',
                                ],
                            ],
                        ],
                        [
                            'key' => 'brandjo_tier_popular',
                            'label' => 'Popular?',
                            'name' => 'popular',
                            'type' => 'true_false',
                            'ui' => 1,
                            'default_value' => 0,
                        ],
                        [
                            'key' => 'brandjo_tier_badge',
                            'label' => 'Badge Text',
                            'name' => 'badge',
                            'type' => 'text',
                            'instructions' => 'Optional badge (e.g. MOST POPULAR)',
                        ],
                        [
                            'key' => 'brandjo_tier_cta',
                            'label' => 'CTA Button Text',
                            'name' => 'cta_text',
                            'type' => 'text',
                            'required' => 1,
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-pricing',
            ],
        ],
    ],
]);

// ============================================================
// 8. FAQ SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_faq',
    'title' => 'FAQ Section',
    'fields' => [
        [
            'key' => 'brandjo_faq_group',
            'label' => 'FAQ Content',
            'name' => 'faq',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_faq_header',
                    'label' => 'Section Header',
                    'name' => 'section_header',
                    'type' => 'text',
                    'default_value' => 'KNOWLEDGE GRID',
                ],
                [
                    'key' => 'brandjo_faq_title',
                    'label' => 'Section Title',
                    'name' => 'section_title',
                    'type' => 'text',
                    'default_value' => 'Frequently Answered Questions.',
                ],
                [
                    'key' => 'brandjo_faq_support_callout',
                    'label' => 'Support Callout',
                    'name' => 'support_callout',
                    'type' => 'text',
                    'default_value' => 'Have other proprietary questions?',
                ],
                [
                    'key' => 'brandjo_faq_support_subtext',
                    'label' => 'Support Subtext',
                    'name' => 'support_subtext',
                    'type' => 'text',
                    'default_value' => 'Our executive partners are active in managing corporate inquiry streams.',
                ],
                [
                    'key' => 'brandjo_faq_support_cta',
                    'label' => 'Support CTA Text',
                    'name' => 'support_cta',
                    'type' => 'text',
                    'default_value' => 'Ask Executive Team',
                ],
                [
                    'key' => 'brandjo_faq_items',
                    'label' => 'FAQ Items',
                    'name' => 'items',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add FAQ Item',
                    'sub_fields' => [
                        [
                            'key' => 'brandjo_faq_item_id',
                            'label' => 'ID',
                            'name' => 'id',
                            'type' => 'text',
                        ],
                        [
                            'key' => 'brandjo_faq_question',
                            'label' => 'Question',
                            'name' => 'question',
                            'type' => 'text',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_faq_answer',
                            'label' => 'Answer',
                            'name' => 'answer',
                            'type' => 'textarea',
                            'required' => 1,
                        ],
                        [
                            'key' => 'brandjo_faq_category',
                            'label' => 'Category',
                            'name' => 'category',
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-faq',
            ],
        ],
    ],
]);

// ============================================================
// 9. FINAL CTA SECTION
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_final_cta',
    'title' => 'Final CTA Section',
    'fields' => [
        [
            'key' => 'brandjo_final_cta_group',
            'label' => 'CTA Content',
            'name' => 'final_cta',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_final_cta_headline',
                    'label' => 'Headline',
                    'name' => 'headline',
                    'type' => 'text',
                    'default_value' => 'Your Brand Deserves More Attention.',
                ],
                [
                    'key' => 'brandjo_final_cta_subheadline',
                    'label' => 'Subheadline',
                    'name' => 'subheadline',
                    'type' => 'textarea',
                    'default_value' => 'Let\'s build content people actually remember. Stop burning resources on low-retention updates. Harness high-fidelity cinematic video engines and custom conversion matrices instead.',
                ],
                [
                    'key' => 'brandjo_final_cta_button',
                    'label' => 'Button Text',
                    'name' => 'button_text',
                    'type' => 'text',
                    'default_value' => 'Book Your Strategy Call',
                ],
                [
                    'key' => 'brandjo_final_cta_limit',
                    'label' => 'Limit Text',
                    'name' => 'limit_text',
                    'type' => 'text',
                    'default_value' => 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-final-cta',
            ],
        ],
    ],
]);

// ============================================================
// 10. INTRO VIDEO
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_intro_video',
    'title' => 'Intro Video',
    'fields' => [
        [
            'key' => 'brandjo_intro_video_group',
            'label' => 'Intro Video Content',
            'name' => 'intro_video',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_intro_video_section_header',
                    'label' => 'Section Header',
                    'name' => 'section_header',
                    'type' => 'text',
                    'default_value' => 'EXECUTIVE BRIEF',
                ],
                [
                    'key' => 'brandjo_intro_video_section_title',
                    'label' => 'Section Title',
                    'name' => 'section_title',
                    'type' => 'text',
                    'default_value' => 'See How We Build Attention.',
                ],
                [
                    'key' => 'brandjo_intro_video_description',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'textarea',
                    'default_value' => 'We bypass traditional advertising hurdles. By introducing a rigid pipeline of custom content strategy, high-fidelity video editing, brand positioning elements, and automatic organic distribution systems, we scale user authority organically.',
                ],
                [
                    'key' => 'brandjo_intro_video_file',
                    'label' => 'Video File (Media Library)',
                    'name' => 'video_file',
                    'type' => 'file',
                    'return_format' => 'url',
                    'library' => 'all',
                    'instructions' => 'Or upload a video file from the Media Library (MP4 recommended).',
                    'required' => 0,
                ],
                [
                    'key' => 'brandjo_intro_video_youtube',
                    'label' => 'YouTube Video URL',
                    'name' => 'youtube_url',
                    'type' => 'oembed',
                    'instructions' => 'Paste a YouTube or Vimeo video URL as an alternative to the file upload.',
                    'required' => 0,
                ],
                [
                    'key' => 'brandjo_intro_video_duration',
                    'label' => 'Video Duration',
                    'name' => 'duration',
                    'type' => 'text',
                    'instructions' => 'e.g. 1 min 24 sec',
                    'default_value' => '1 min 24 sec',
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-intro-video',
            ],
        ],
    ],
]);

// ============================================================
// 11. FOOTER / CONTACT
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_footer',
    'title' => 'Footer / Contact',
    'fields' => [
        [
            'key' => 'brandjo_footer_group',
            'label' => 'Footer Content',
            'name' => 'footer',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_footer_email',
                    'label' => 'Email',
                    'name' => 'email',
                    'type' => 'email',
                    'default_value' => 'directors@brandjo.media',
                ],
                [
                    'key' => 'brandjo_footer_location',
                    'label' => 'Studio Location',
                    'name' => 'studio_location',
                    'type' => 'text',
                    'default_value' => 'Creative Studio Paris / London Soho Hub - Operating Worldwide',
                ],
                [
                    'key' => 'brandjo_footer_copyright',
                    'label' => 'Copyright Text',
                    'name' => 'copyright',
                    'type' => 'text',
                    'default_value' => '© ' . date('Y') . ' Brandjo Media. All rights reserved.',
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-footer',
            ],
        ],
    ],
]);

// ============================================================
// 11. BUTTONS
// ============================================================
acf_add_local_field_group([
    'key' => 'brandjo_buttons',
    'title' => 'Buttons',
    'fields' => [
        [
            'key' => 'brandjo_buttons_group',
            'label' => 'Button Settings',
            'name' => 'buttons',
            'type' => 'group',
            'layout' => 'block',
            'sub_fields' => [
                [
                    'key' => 'brandjo_buttons_tab_navbar',
                    'label' => 'Navbar',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_navbar_book_call',
                    'label' => 'Book a Call Text',
                    'name' => 'navbar_book_call_text',
                    'type' => 'text',
                    'default_value' => 'Book a Call',
                ],
                [
                    'key' => 'brandjo_buttons_navbar_book_call_url',
                    'label' => 'Book a Call URL (optional)',
                    'name' => 'navbar_book_call_url',
                    'type' => 'text',
                    'default_value' => '',
                ],
                [
                    'key' => 'brandjo_buttons_tab_hero',
                    'label' => 'Hero Section',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_hero_cta_primary',
                    'label' => 'Primary CTA Text',
                    'name' => 'hero_cta_primary_text',
                    'type' => 'text',
                    'default_value' => 'Start Your Brand',
                ],
                [
                    'key' => 'brandjo_buttons_hero_cta_primary_url',
                    'label' => 'Primary CTA URL (optional)',
                    'name' => 'hero_cta_primary_url',
                    'type' => 'text',
                    'default_value' => '',
                ],
                [
                    'key' => 'brandjo_buttons_hero_cta_secondary',
                    'label' => 'Secondary CTA Text',
                    'name' => 'hero_cta_secondary_text',
                    'type' => 'text',
                    'default_value' => 'View Projects',
                ],
                [
                    'key' => 'brandjo_buttons_hero_cta_secondary_url',
                    'label' => 'Secondary CTA URL',
                    'name' => 'hero_cta_secondary_url',
                    'type' => 'text',
                    'default_value' => '#projects',
                ],
                [
                    'key' => 'brandjo_buttons_hero_scroll_text',
                    'label' => 'Scroll Indicator Text',
                    'name' => 'hero_scroll_text',
                    'type' => 'text',
                    'default_value' => 'DISCOVER THE MOVEMENT',
                ],
                [
                    'key' => 'brandjo_buttons_hero_scroll_url',
                    'label' => 'Scroll Indicator URL',
                    'name' => 'hero_scroll_url',
                    'type' => 'text',
                    'default_value' => '#video-reel',
                ],
                [
                    'key' => 'brandjo_buttons_tab_intro_video',
                    'label' => 'Intro Video',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_intro_video_play',
                    'label' => 'Play Button Text',
                    'name' => 'intro_video_play_text',
                    'type' => 'text',
                    'default_value' => 'Launch Cinematic Reel',
                ],
                [
                    'key' => 'brandjo_buttons_tab_projects',
                    'label' => 'Projects',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_projects_watch_label',
                    'label' => 'Watch Project Hover Label',
                    'name' => 'projects_watch_label',
                    'type' => 'text',
                    'default_value' => 'Watch the Project',
                ],
                [
                    'key' => 'brandjo_buttons_tab_final_cta',
                    'label' => 'Final CTA',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_final_cta_button',
                    'label' => 'CTA Button Text',
                    'name' => 'final_cta_button_text',
                    'type' => 'text',
                    'default_value' => 'Book Your Strategy Call',
                ],
                [
                    'key' => 'brandjo_buttons_final_cta_button_url',
                    'label' => 'CTA Button URL (optional)',
                    'name' => 'final_cta_button_url',
                    'type' => 'text',
                    'default_value' => '',
                ],
                [
                    'key' => 'brandjo_buttons_final_cta_limit',
                    'label' => 'Limit Text',
                    'name' => 'final_cta_limit_text',
                    'type' => 'text',
                    'default_value' => 'LIMITED TO 4 HIGH-TIER NEW BRANDS THIS CALENDAR QUARTER',
                ],
                [
                    'key' => 'brandjo_buttons_tab_faq',
                    'label' => 'FAQ',
                    'type' => 'tab',
                ],
                [
                    'key' => 'brandjo_buttons_faq_support_cta',
                    'label' => 'Support CTA Text',
                    'name' => 'faq_support_cta_text',
                    'type' => 'text',
                    'default_value' => 'Ask Executive Team',
                ],
                [
                    'key' => 'brandjo_buttons_faq_support_cta_url',
                    'label' => 'Support CTA URL',
                    'name' => 'faq_support_cta_url',
                    'type' => 'text',
                    'default_value' => '#contact',
                ],
            ],
        ],
    ],
    'location' => [
        [
            [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'brandjo-media-buttons',
            ],
        ],
    ],
]);
