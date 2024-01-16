import { useTimeDailyActivity } from '@app/hooks/features/useTimeDailyActivity';
import { AppVisitedSkeleton } from './components/app-visited-skeleton';
import { groupAppsByHour } from '@app/helpers/array-data';
import { useTranslations } from 'next-intl';
import AppVisitedItem from './components/app-visited-Item';

export function VisitedSitesTab({ id }: { id?: string}) {
	const { visitedSites, loading } = useTimeDailyActivity('URL', id);
	const t = useTranslations();
	const sites = groupAppsByHour(visitedSites);
	return (
		<div>
			<div className="flex justify-end w-full">{/* TODO: Filters components */}</div>
			<header className="bg-gray-200 dark:bg-[#26272C] rounded-md p-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold flex-1">{t('timer.APPS')}</h3>
				<h3 className="text-lg text-center font-semibold  2xl:w-56 3xl:w-64">{t('timer.VISITED_DATES')}</h3>
				<h3 className="text-lg text-center font-semibold flex-1">{t('timer.PERCENT_USED')}</h3>
				<h3 className="text-lg font-semibold  2xl:w-52 3xl:w-64 text-end">{t('timer.TIME_SPENT_IN_HOURS')}</h3>
			</header>
			<section>
				{sites.map((site, i) => (
					<div
						key={i}
						className="border shadow-lg  rounded-md my-4 p-4 dark:border-[#FFFFFF0D] bg-white dark:bg-[#1B1D22]"
					>
						<h3>{site.hour}</h3>
						<div>
							{site.apps?.map((item, i) => (
								<div key={i} className="w-full">
									<AppVisitedItem app={item} totalMilliseconds={site.totalMilliseconds} type="SITE" />
								</div>
							))}
						</div>
					</div>
				))}
			</section>
			{visitedSites.length < 1 && !loading && (
				<div className="hover:dark:bg-[#26272C] border dark:border-[#26272C] dark:bg-[#191a20] p-4 py-16 rounded-md flex justify-center items-center my-2">
					<p className="text-lg text-center">{t('timer.THERE_IS_NO_APPS_VISITED')}</p>
				</div>
			)}
			{loading && visitedSites.length < 1 && (
				<>
					<AppVisitedSkeleton />
					<AppVisitedSkeleton />
				</>
			)}
		</div>
	);
}
