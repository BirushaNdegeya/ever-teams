import { ITimerApps } from '@app/interfaces/timer/ITimerApp';
import { ITimerSlot } from '@app/interfaces/timer/ITimerSlot';
import { atom } from 'recoil';

export const timeSlotsState = atom<ITimerSlot[]>({
	key: 'timeSlotsState',
	default: []
});

export const timeAppsState = atom<ITimerApps[]>({
	key: 'timeAppsState',
	default: []
});
