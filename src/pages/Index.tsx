const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Discord рекламные площадки
        </h1>

        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Игровые сообщества</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Активное сообщество геймеров. Высокий охват среди целевой
              аудитории 18-25 лет.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">15,000 участников</span>
              <span className="text-lg font-bold text-green-600">5,000₽</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Криптовалютный канал</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Аудитория инвесторов и трейдеров. Ежедневная активность 2000+
              участников.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">8,500 участников</span>
              <span className="text-lg font-bold text-green-600">3,500₽</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              IT-сообщество разработчиков
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Профессиональная аудитория программистов и дизайнеров.
              Качественный трафик.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">12,200 участников</span>
              <span className="text-lg font-bold text-green-600">4,200₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
