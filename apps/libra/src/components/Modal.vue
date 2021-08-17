<template>
  <div class="n-template-modal">
    <button class="n-template-modal__open" type="button" @click="openModal">
      {{ texts.trigger }}
    </button>
    <div v-show="modalShowed">
      <div class="n-template-modal__overlay" />
      <div class="n-template-modal__content">
        <button
          class="n-template-modal__close"
          type="button"
          @click="hideModal"
        >
          x
        </button>
        <slot :closed="!modalShowed" name="content" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "STemplateModal",
  props: {
    texts: {
      type: Object,
      default: () => ({
        trigger: ""
      })
    }
  },
  data() {
    return {
      modalShowed: false
    };
  },
  watch: {
    modalShowed(isOpen) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  },
  methods: {
    hideModal() {
      this.$emit("hide-modal");
      this.modalShowed = false;
    },
    openModal() {
      this.modalShowed = true;
    }
  }
};
</script>

<style>
.n-template-modal {
}
.n-template-modal__open {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
color: #fff;
    background-color: #007bff;
    border-color: #007bff;

}
.n-template-modal__overlay {
  z-index: 1040;
  display: flex;
  opacity: 0.5;
  background: #000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
}
.n-template-modal__content {
  width: 90%;
  height: 90%;
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 auto;
  transform: translate(0, -50%);
  z-index: 1050;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 20%);
  position: fixed;
  border-left-width: 4px;
  border-bottom-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-width: 1px;
  border-radius: 0.25rem;
  background-color: #f8fafc;
}
.n-template-modal__close {
  z-index: 310;
  right: 0;
  position: absolute;
  height: 35px;
  width: 35px;
}
.n-template-modal__close-icon {
  font-size: 1.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display: flex;
  align-self: center;
  opacity: 0.8;
  height: 35px;
  width: 35px;

  span {
    height: 100%;
    width: 100%;
  }
}
.n-configurator-modal-container-size {
  width: 90%;
  height: 90%;
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 auto;
  transform: translate(0, -50%);
}

.n-configurator-modal-button-position {
  top: 6%;
  right: 4%;
  transform: translate(-50%, -50%);
}
</style>
