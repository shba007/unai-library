// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import pwa from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BASE_URL ?? 'http://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    pwa({
      scope: '/',
      base: '/',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'AI Guide',
        short_name: 'AI Guide',
        description: 'An AI Guide Book',
        theme_color: '#0EA5E9',
        background_color: '#0EA5E9',
        orientation: 'portrait',
        shortcuts: [],
        icons: [
          {
            src: '/pwa/icon-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-maskable-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/pwa/screenshot-desktop-1.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 1',
          },
          {
            src: '/pwa/screenshot-desktop-2.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 2',
          },
          {
            src: '/pwa/screenshot-desktop-3.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 3',
          },
          {
            src: '/pwa/screenshot-mobile-1.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 1',
          },
          {
            src: '/pwa/screenshot-mobile-2.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 2',
          },
          {
            src: '/pwa/screenshot-mobile-3.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 3',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,jpg,png,svg,webp,ico}'],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'NetworkFirst',
          },
        ],
        navigateFallback: undefined,
      },
      devOptions: {
        type: 'module',
        enabled: false,
        suppressWarnings: false,
        navigateFallback: undefined,
      },
    }),
  ],
})
