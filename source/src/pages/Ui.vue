<template>
  <div class="ui">
    <div class="b-h1">Тестирование отрисовки компонентов:</div>

    <h3 class="b-h3">- Иконки</h3>
    <b-icon name="archive" size="32" color="#000000"></b-icon>
    <b-icon name="info-bold" size="32" color="#000000"></b-icon>
    <b-icon name="file" size="32" boxed></b-icon>

    <h3 class="b-h3">- Аватар</h3>
    <b-avatar size="xl"></b-avatar>

    <h3 class="b-h3">- Кнопка</h3>
    <b-btn>Привет!</b-btn>

    <h3 class="b-h3">- Аккордион</h3>
    <b-accordion title="Госпитализация экстренная">
      Проведение сложных кардиохирургических операций: ...
    </b-accordion>

    <h3 class="b-h3">- Бейдж</h3>
    <b-badge size="m">M - 32px</b-badge>

    <h3 class="b-h3">- Чекбокс</h3>

    <b-checkbox v-model="m1">Обычное состояние</b-checkbox> {{ m1 }}

    <h3 class="b-h3">- Инпут</h3>
    <b-input
      v-model="m3"
      size="m"
      placeholder="Input M"
      icon="doctor"
      canceled
    />
    <code>
      {{ m3 }}
    </code>

    <h3 class="b-h3">- Селект</h3>
    <b-select placeholder="Обычный селект" :options="options2" v-model="m2" />
    <div>
      <code>
        {{ m2 }}
      </code>
    </div>
    <br /><br />
    <b-select
      v-model="m4"
      placeholder="Обычный селект"
      :options="options2"
      :filter-fn="filter"
    ></b-select>
    <div>
      <code>
        {{ m4 }}
      </code>
    </div>

    <h3 class="b-h3">- Дропдауны</h3>
    <b-dropdown label="Dropdown Secondary" button-type="uncolored">
      <b-dropdown-item> Некий текст для дропдауна2 </b-dropdown-item>
      <b-dropdown-item> Некий текст для дропдауна </b-dropdown-item>
    </b-dropdown>

    <h3 class="b-h3">- Датапикер</h3>
    <b-datepicker placeholder="Дата" v-model="m5" />
    <div>
      <code>
        {{ m5 }}
      </code>
    </div>

    <h3 class="b-h3">- Модальные окна</h3>
    <div class="q-mb-lg">
      <b-btn @click="isShowModal = true">Открыть окно</b-btn>
    </div>
    <b-modal v-model="isShowModal">
      <div class="text-center">
        <img src="/img/broken-heart.svg" />
      </div>
      <div class="text-center b-h3 q-mb-sm">
        Заголовок попапа максимум две строки
      </div>
      <div class="text-center b-text-md q-mb-lg">
        Основной текст попапа, может быть в несколько строчек
      </div>
      <b-btn block class="q-mb-sm">Submit</b-btn>
      <b-btn block type="pale">Cancel</b-btn>
    </b-modal>

    <h3 class="b-h3">- Табы</h3>
    <b-tabs v-model="currentTab">
      <b-tab :badge="10" label="Заголовок 1" name="tab1"></b-tab>
      <b-tab label="Заголовок 2" name="tab2"></b-tab>
      <b-tab label="Заголовок 3" name="tab3" :disabled="true"></b-tab>
    </b-tabs>
    <div>
      <code>
        {{ currentTab }}
      </code>
    </div>

    <h3 class="b-h3">- Пагинация</h3>
    <b-pagination v-model="currentPag" :max="10"></b-pagination>
    <div>
      <code>
        {{ currentPag }}
      </code>
    </div>

    <h3 class="b-h3">- Таблица</h3>
    <b-table :columns="columns" :items="items">
      <caption slot="caption">
        Table
      </caption>
    </b-table>

    <h3 class="b-h3">- Cancellable</h3>
    <b-btn @click="onClickCancel">Удалить навсегда</b-btn>
    <b-cancellable
      v-model="showCancellable"
      message="Фотография удалена"
      buttonLabel="Отменить"
      cancelMessage="Действие отменено"
      :timeout="7000"
      @timer-end="mockApiCall"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import {
  BIcon,
  BBtn,
  BAvatar,
  BBadge,
  BCheckbox,
  BInput,
  BAccordion,
  BSelect,
  BDropdown,
  BDropdownItem,
  BDatepicker,
  BModal,
  BTabs,
  BTab,
  BPagination,
  BTable,
  BCancellable,
} from '@/ui';

const cache = [
  {
    label: 'Google',
    value: 'Google1',
    description: 'Search engine',
    category: '1',
    test: '111',
  },
  {
    label: 'Facebook',
    value: 'Facebook2',
    description: 'Social media',
    category: '1',
    test: '222',
  },
  {
    label: 'Twitter',
    value: 'Twitter3',
    description: 'Quick updates',
    category: '2',
    test: '333',
  },
  {
    label: 'Apple',
    value: 'Apple4',
    description: 'iStuff',
    category: '2',
    test: '5555',
  },
  {
    label: 'Oracle',
    value: 'Oracle5',
    disable: true,
    description: 'Databases',
    category: '3',
    test: '888',
  },
];

@Options({
  components: {
    BIcon,
    BBtn,
    BAccordion,
    BAvatar,
    BBadge,
    BCheckbox,
    BInput,
    BSelect,
    BDropdown,
    BDropdownItem,
    BDatepicker,
    BModal,
    BTabs,
    BTab,
    BPagination,
    BTable,
    BCancellable,
  },
})
export default class Ui extends Vue {
  m1 = false;
  m2 = null;
  m3 = '';
  m4 = null;
  m5 = null;
  currentPag = 1;
  isShowModal = false;
  currentTab = 'tab1';
  showCancellable = false;
  options2 = [
    {
      label: 'Google',
      value: 'Google1',
      description: 'Search engine',
      category: '1',
      test: '111',
    },
    {
      label: 'Facebook',
      value: 'Facebook2',
      description: 'Social media',
      category: '1',
      test: '222',
    },
    {
      label: 'Twitter',
      value: 'Twitter3',
      description: 'Quick updates',
      category: '2',
      test: '333',
    },
    {
      label: 'Apple',
      value: 'Apple4',
      description: 'iStuff',
      category: '2',
      test: '5555',
    },
    {
      label: 'Oracle',
      value: 'Oracle5',
      disable: true,
      description: 'Databases',
      category: '3',
      test: '888',
    },
  ];

  columns = [
    { key: 'last_name', label: 'Фамилия', sortable: true },
    { key: 'first_name', label: 'Имя', sortable: true },
    { key: 'age', label: 'Возраст', sortable: true },
    { key: 'isActive', label: 'Активный', sortable: false },
  ];

  items = [
    {
      isActive: true,
      age: 40,
      first_name: 'Dickerson',
      last_name: 'Macdonald',
    },
    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
  ];

  filter(val: any) {
    this.options2 = cache.filter((v) =>
      v.label.toLowerCase().includes(val.toLowerCase())
    );
  }

  onClickCancel() {
    this.showCancellable = true;
  }

  mockApiCall() {
    console.log('Удалено');
  }
}
</script>

<style lang="scss">
.ui {
  max-width: 1000px;
  margin: 50px auto 0;
  box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
  background: #ffffff;
  border-radius: 8px;
  padding: 40px 24px 24px 24px;
}
</style>
