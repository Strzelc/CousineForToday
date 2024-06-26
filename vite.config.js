import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/scss/app.scss',
                'resources/js/app.js',
                'resources/js/makeRecipeList.js',
                'resources/js/addRecipe.js',
                'resources/js/addIngredient.js',
                'resources/css/app.css',
        ],
            refresh: true,
        }),
    ],
});
