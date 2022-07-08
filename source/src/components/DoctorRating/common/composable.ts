import { getDoctors, getSpecialties } from '@/api/doctor';
import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { SelectOption, DoctorSelectOption } from './types';
import Notify from '@/utils/notify';
import { tabList } from './support';
import { useRoute, useRouter } from 'vue-router';
import { InterviewStatus } from '@/api/rate/v1/types';
import { fio } from '@/utils/forrmaters';

function useSelect<T = SelectOption>() {
  const selected = ref<SelectOption[]>([]);
  const list = ref<SelectOption[]>([]);
  const cache = ref<SelectOption[]>([]);

  const selectedIds = computed(() =>
    selected.value.map((value) => value.value)
  );
  const selectedNames = computed(() =>
    selected.value.map((value) => value.label)
  );

  watch(cache, (values) => (list.value = values));

  const filter = (value: string) =>
    (list.value = cache.value.filter((v) =>
      v.label.toLowerCase().includes(value.toLowerCase())
    ));

  return {
    selected: selected as Ref<T[]>,
    list: list as Ref<T[]>,
    cache: cache as Ref<T[]>,
    selectedIds,
    selectedNames,
    filter,
  };
}

export function useDoctorsSelect() {
  const { selected, list, cache, selectedIds, filter } =
    useSelect<DoctorSelectOption>();

  watch(cache, (doctors) => (list.value = doctors));

  const fetch = async (specialties?: string[]) => {
    try {
      const doctorSpecialties = specialties?.length ? specialties : undefined;

      const doctors = await getDoctors({
        DoctorSpecialitiesIds: doctorSpecialties,
      });

      cache.value = doctors.map((doctor) => ({
        label: fio(doctor),
        value: doctor.doctorId || '',
        specialityIds: (doctor.specialities || []).map(
          (special) => special.specialityId
        ),
      }));
    } catch (error) {
      Notify.error('Не удалось получить список всех врачей');
    }
  };

  return {
    list,
    selected,
    selectedIds,
    filter,
    fetch,
  };
}

export function useDoctorSpecialtiesSelect() {
  const { selected, list, cache, selectedIds, selectedNames, filter } =
    useSelect();

  const fetch = async () => {
    try {
      const specialties = await getSpecialties();
      cache.value = specialties.map((specialty) => ({
        label: specialty.specialityName || '',
        value: specialty.specialityId,
      }));
    } catch (error) {
      Notify.error(
        'Не удалось получить специальности доступные для телемедицины'
      );
    }
  };

  return {
    list,
    selected,
    selectedIds,
    selectedNames,
    filter,
    fetch,
  };
}

export function useTabs() {
  const list = ref<typeof tabList>(tabList);
  const current = ref<InterviewStatus>();

  const route = useRoute();
  const router = useRouter();

  const initCurrent = () =>
    (current.value = (route.query.currentTab ||
      tabList[0].name) as InterviewStatus);

  const setCurrentToQuery = (value?: InterviewStatus) =>
    router.push({
      query: {
        ...route.query,
        currentTab: value,
      },
    });

  const fromRouteQuery = computed(() => route.query.currentTab);

  watch(current, setCurrentToQuery);

  onMounted(() => initCurrent());
  onUnmounted(() => setCurrentToQuery());

  return {
    list,
    current,
    fromRouteQuery,
    enum: InterviewStatus,
  };
}
