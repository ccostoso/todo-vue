<template>
    <div class="container py-5">
        <h1>404</h1>
        <p>Sorry, the page you're looking for, <code>{{ $route.params.notFound }}</code>, was not found.</p>
        <router-link :to="{ name: 'tasks' }">Return to Tasks page</router-link>
    </div>
</template>