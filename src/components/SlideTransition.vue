<script setup></script>
<template>
    <TransitionGroup name="slide">
        <slot></slot>
    </TransitionGroup>
</template>
<style>
    @keyframes slide {
        0% {
            opacity: 0;
            transform: translateY(-50px)
        }

        100% {
            opacity: 1;
            transform: translateY(0px)
        }
    }

    .slide-enter-active {
        animation: slide 0.3s ease-in;
    }

    .slide-leave-to {
        opacity: 0;
        transition: all 0.3s ease-out;
        transform: translateY(-50px);
    }

</style>