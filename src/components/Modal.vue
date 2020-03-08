<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <div class="modal-header">
            <slot name="header">
              This is default title
            </slot>
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              <img src="../assets/close.svg" width="12px" height="12px" alt="">
            </button>
          </div>
          <section class="modal-body" id="modalDescription">
            <slot name="body">This is default body</slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(63, 63, 68, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
  }
  .modal-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .modal {
    background: #ffffff;
    width: 95%;
    height: auto;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
    overflow-x: auto;
    display: block;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border-radius: 3px;
    z-index: 999;
  }
  .modal-header, .modal-footer {
    padding: 2rem;
    display: flex;
  }
  .modal-header {
    border-bottom: 1px solid rgba(63, 63, 68, 0.15);
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 3.2rem;
    overflow-y: scroll;
    height: 400px;
  }
  .modal-body::-webkit-scrollbar {
    width: 5px;
  }
  .modal-body::-webkit-scrollbar-thumb {
    background-color: #5563c1;
  }
  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
  }
  .modal-fade-enter, .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .3s ease;
  }
  .modal-fade-enter .modal-container .modal, .modal-fade-leave-active .modal-container .modal {
    top: 200px;
  }
  .modal-fade-enter-active .modal-container .modal, .modal-fade-leave-active .modal-container .modal {
    transition: top .3s ease;
  }
  .modal-popup-enter, .modal-popup-leave-active {
    transform: translateY(50%);
  }
  .modal-popup-enter-active, .modal-popup-leave-active {
    transition: transform .5s ease;
  }
  @media screen and (min-width: 70.3125em) {
    .modal {
      width: 70%;
    }
  }
</style>