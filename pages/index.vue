<template>
    <div class="index-wrapper">
        <MainMenu />
        <div class="btn-add" @click="showMenu = true">
            <span>ADD</span>
        </div>

        <div :class="['slide-panel', showMenu ? 'show' : '']">
            <div class="panel-drop" @click="showMenu = false"></div>
            <div class="panel-content">
                <h5 class="text-center">Select Notes Type</h5>
                <hr />
                <b-row>
                    <b-col>
                        <NuxtLink to="/add">
                            <div class="item-type text-center">
                                <img src="https://picsum.photos/100/100/?image=10" />
                                <div>Link URL</div>
                            </div>
                        </NuxtLink>
                    </b-col>
                    <b-col>
                        <NuxtLink to="/add">
                            <div class="item-type text-center">
                                <img src="https://picsum.photos/100/100/?image=10" />
                                <div>Simple Text</div>
                            </div>
                        </NuxtLink>
                    </b-col>
                    <b-col>
                        <NuxtLink to="/add">
                            <div class="item-type text-center">
                                <img src="https://picsum.photos/100/100/?image=10" />
                                <div>Check List</div>
                            </div>
                        </NuxtLink>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data () {
        return {
            showMenu: false,
        }
    },
}
</script>

<style>
.index-wrapper {
    position: relative;
}

.btn-add {
    background: #28a745;
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    color: #fff;
    cursor: pointer;
    transition: all 0.7s;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
}

.btn-add:hover {
    transform: scale(1.2);
}

.slide-panel {
    position: fixed;
    top: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    /* display: none; */
}

.slide-panel.show {
    top: 0;
}

.slide-panel.show .panel-drop {
    opacity: 1;
}

.slide-panel.show .panel-content {
    bottom: 0;
}

.slide-panel .panel-drop {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
}

.slide-panel .panel-content {
    background: #fff;
    position: absolute;
    bottom: -100vh;
    left: 0;
    right: 0;
    padding: 20px;
    margin: 0 20px;
    border-radius: 10px 10px 0 0;
    min-height: 200px;
    transition: all 0.5s;
}

.item-type {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
}

.item-type:hover {
    background: rgba(0, 0, 0, 0.1);
}

.item-type img {
    margin-top: 10px;
    border-radius: 5px;
}
</style>