'use client';

import React from 'react';
import { Modal, ProgressBar, Tooltip } from 'lib/components';
import { ITimerSlot } from '@app/interfaces/timer/ITimerSlot';
import ScreenshotItem from './screenshot-item';
import { useTranslations } from 'next-intl';

const ScreenshotDetailsModal = ({
	open,
	closeModal,
	slot
}: {
	open: boolean;
	closeModal: () => void;
	slot: ITimerSlot;
}) => {
	const t = useTranslations();
	return (
		<Modal
			isOpen={open}
			title="Screenshots detail"
			closeModal={closeModal}
			className="bg-white dark:bg-[#343434d4] p-4 rounded-lg lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] m-8"
		>
			<div className="w-full p-4 overflow-x-scroll">
				<h1 className="py-2 font-semibold text-lg">
					{new Date(slot.startedAt).toLocaleTimeString()} - {new Date(slot.stoppedAt).toLocaleTimeString()}
				</h1>
				<ProgressBar progress={slot.percentage + '%'} width={'100%'} />
				<p className="font-semibold py-1">
					{slot.percentage} {t('timer.PERCENT_OF_MINUTES')}
				</p>
				<div className="my-2 flex overflow-x-auto">
					{slot.screenshots.map((screenshot, i) => (
						<div key={i} className="w-1/3 p-2">
							<Tooltip
								label={screenshot.description}
								placement="left-start"
								type="VERTICAL"
								labelContainerClassName="w-full"
							>
								<ScreenshotItem
									endTime={slot.stoppedAt}
									startTime={screenshot.recordedAt}
									imageUrl={screenshot.thumbUrl}
									percent={0}
									showProgress={false}
									onShow={() => null}
								/>
							</Tooltip>
							<div className="bg-gray-100 dark:dark:bg-[#26272C] rounded-b-lg p-2">
								<h5>Source</h5>
								<div className="my-1 flex gap-1 flex-wrap">
									{screenshot.apps?.map((app, i) => (
										<span key={i} className="rounded-lg px-1 mb-1 text-white bg-blue-600">
											{app}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default ScreenshotDetailsModal;
