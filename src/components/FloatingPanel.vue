<template>
    <section class="floating-panel">
        <div class="floating-panel__content">
            <slot name="FloatingPanelContent"></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FloatingPanel'
}
</script>

<style>
.floating-panel {
    background-color: #ffffff;
    width: 100%;
    max-width: 1100px;
    margin-top: -5rem;
    padding: 2rem;
    border-radius: .75rem;
    box-shadow: 0 0 100px 5px rgba(0, 0, 0, 0.1);
}
</style>