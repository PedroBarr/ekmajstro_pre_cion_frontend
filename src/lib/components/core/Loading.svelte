<script lang="ts">
    // exportar dependencias
    export let size: string = 'medium';
    export let loading_text: string = 'Cargando...';
    export let color: string = '#000000';
</script>

<div class="loading-container {size}">
    <div class="loading-spinner" style="border-color: {color};">
        <div class="spinner-inner-left" style="border-bottom-color: {color};"></div>
        <div class="spinner-inner-center" style="border-top-color: {color};"></div>
        <div class="spinner-inner-right" style="border-top-color: {color};"></div>
    </div>
    <p class="loading-text" style="color: {color};">{loading_text}</p>
</div>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .loading-spinner {
        border: 4px solid transparent;
        border-top-color: var(--color-primary);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    .loading-text {
        margin-top: 16px;
        font-size: 16px;
        font-size: x-large;
        font-family: system-ui;
        text-transform: uppercase;
        font-style: oblique;
    }

    .spinner-inner-right,
    .spinner-inner-center,
    .spinner-inner-left {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-sizing: border-box;
        border: 4px solid transparent;
        animation: spin 1s linear infinite;
    }
    
    .spinner-inner-right {
        border-top-color: var(--color-primary);
        transform: rotate(180deg);
    }

    .spinner-inner-left {
        border-bottom-color: var(--color-primary);
        transform: rotate(90deg);
        animation-delay: -0.5s;
    }

    .spinner-inner-center {
        border-top-color: var(--color-primary);
        transform: rotate(270deg);
        animation-delay: -0.25s;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loading-container.small .loading-spinner {
        width: 20px;
        height: 20px;
    }

    .loading-container.large .loading-spinner {
        width: 60px;
        height: 60px;
    }
    .loading-container.medium .loading-spinner {
        width: 40px;
        height: 40px;
    }
    .loading-container.small {
        height: 50px;
    }
    .loading-container.large {
        height: 100px;
    }
    .loading-container.medium {
        height: 70px;
    }
    @media (max-width: 768px) {
        .loading-container {
            height: 50px;
        }
        .loading-spinner {
            width: 20px;
            height: 20px;
        }
        .loading-text {
            font-size: 12px;
        }
    }
    @media (min-width: 769px) {
        .loading-container {
            height: 70px;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
        }
        .loading-text {
            font-size: 16px;
        }
    }
    @media (min-width: 1200px) {
        .loading-container {
            height: 100px;
        }
        .loading-spinner {
            width: 60px;
            height: 60px;
        }
        .loading-text {
            font-size: 20px;
        }
    }
</style>