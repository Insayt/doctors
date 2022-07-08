<template>
  <b-avatar size="m" class="docHeader__avatar" :url="url"></b-avatar>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { BAvatar } from '@/ui';
import { getFile } from '@/api/renfiles';

@Options({
  components: {
    BAvatar,
  },
})
export default class UserAvatar extends Vue {
  @Prop(String) readonly avatarId!: string | null;
  url = '';

  async getAvatar() {
    try {
      this.url = await getFile(this.avatarId);
    } catch (e) {
      this.url = '';
    }
  }

  @Watch('avatarId')
  async onAvatarChanged(val: string) {
    if (val) {
      await this.getAvatar();
    } else {
      this.url = '';
    }
  }

  async mounted() {
    if (this.avatarId) {
      await this.getAvatar();
    } else {
      this.url = '';
    }
  }
}
</script>

<style lang="scss"></style>
