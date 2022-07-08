<template>
  <span class="doc-document">
    <span
      v-for="doc in shortenDocs"
      :key="doc.fileId"
      class="doc-document__item b-text-link"
      @click="downloadDocument(doc)"
    >
      {{ `${doc.label} (${bytesToSize(doc.fileSize)})` }};
    </span>
  </span>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { bytesToSize } from '@/utils/forrmaters';
import { getFile } from '@/api/renfiles';
import { ConsultationRecordDto } from '@/api/telemed/types/v1';

interface Document extends ConsultationRecordDto {
  fileLabel: string;
  label: string;
}

@Options({})
export default class DocDocuments extends Vue {
  @Prop(Array) readonly documents!: Document[];
  @Prop({
    type: String,
    default: 'fileLabel',
  })
  readonly label!: '';
  @Prop({
    type: Number,
    default: 20,
  })
  readonly maxLength!: 20;

  get shortenDocs() {
    const shortLength = (this.maxLength - 4) / 2;
    return this.documents.map((d: any) => {
      const label = d[this.label];
      const shortLabel =
        label.length < this.maxLength
          ? label
          : `${label.slice(0, shortLength)}...${label.slice(-shortLength)}`;
      return {
        ...d,
        label: shortLabel,
      };
    });
  }

  async downloadDocument(doc: any) {
    const fileName = doc[this.label];
    const url = await getFile({ fileId: doc.fileId, fileName });
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  bytesToSize(bytes: number) {
    return bytesToSize(bytes);
  }
}
</script>

<style lang="scss" scoped>
.doc-document {
  &__item {
    cursor: pointer;
  }
}
</style>
