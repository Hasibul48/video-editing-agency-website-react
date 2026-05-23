<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <style>
        html { scroll-behavior: smooth; font-feature-settings: "cv02", "cv03", "cv04", "cv11"; }
        body { background-color: #09090B; color: #F4F4F5; overflow-x: hidden; text-rendering: geometricPrecision; margin: 0; font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #09090B; }
        ::-webkit-scrollbar-thumb { background: #27272A; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #8B5CF6; }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
        }
    </style>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="root"></div>

<script>
window.wpData = <?php echo brandjo_get_wp_data_json(); ?>;
</script>

<?php wp_footer(); ?>
</body>
</html>
