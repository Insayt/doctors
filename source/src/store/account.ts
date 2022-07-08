import { defineStore } from 'pinia';
import { getPersonalData } from '@/api/account';
import { UserProfileDto, Gender, UserClaimsDto } from '@/api/account/types/v1';
import { NullableTypes } from '@/types';

type AccountState = {
  status: string;
} & NullableTypes<UserProfileDto>;

const GENDERS = [
  { label: '—', value: Gender.None },
  { label: 'Мужской', value: Gender.Male },
  { label: 'Женский', value: Gender.Female },
];

export default defineStore('account', {
  state: (): AccountState => ({
    addresses: [],
    avatarId: '',
    birthDate: '',
    claims: <UserClaimsDto>{
      claims: {},
      tokenClaims: {},
    },
    consent: false,
    creationDate: '',
    departmentId: null,
    email: null,
    emailStatus: null,
    firstName: null,
    lastName: null,
    middleName: null,
    gender: Gender.None,
    hasSignature: null,
    isEnabled: false,
    login: '',
    misId: null,
    misLifeId: null,
    misLifeLogin: null,
    misLogin: null,
    phoneNumber: null,
    role: '',
    snils: null,
    source: null,
    userApp: null,
    userId: '',
    userPhones: [],
    status: 'Offline',
    userProfile: null,
  }),
  actions: {
    async getPersonalData(): Promise<UserProfileDto> {
      const res = await getPersonalData();

      this.addresses = res.addresses;
      this.avatarId = res.avatarId;
      this.birthDate = res.birthDate;
      this.claims = res.claims;
      this.consent = res.consent;
      this.creationDate = res.creationDate;
      this.departmentId = res.departmentId;
      this.email = res.email;
      this.emailStatus = res.emailStatus;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.middleName = res.middleName;
      this.gender = res.gender;
      this.hasSignature = res.hasSignature;
      this.isEnabled = res.isEnabled;
      this.login = res.login;
      this.misId = res.misId;
      this.misLifeId = res.misLifeId;
      this.misLifeLogin = res.misLifeLogin;
      this.misLogin = res.misLogin;
      this.phoneNumber = res.phoneNumber;
      this.role = res.role;
      this.snils = res.snils;
      this.source = res.source;
      this.userApp = res.userApp;
      this.userId = res.userId;
      this.userPhones = res.userPhones;
      this.userProfile = res.userProfile;

      return res;
    },
  },
  getters: {
    isAdmin(): boolean {
      return this.role === 'DoctorAdmin';
    },
    isRater(): boolean {
      return this.userProfile === 'DoctorEmpathyProfile';
    },
    FIO(): string {
      if (this.firstName) {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
      } else {
        return '—';
      }
    },
    userName(state) {
      if (state.firstName) {
        return `${state.firstName} ${state.lastName}`;
      } else if (state.login) {
        return state.login;
      } else {
        return '';
      }
    },
    getGender(): string {
      const gender = GENDERS.find((g) => g.value === this.gender) || GENDERS[0];
      return gender.label;
    },
  },
});
