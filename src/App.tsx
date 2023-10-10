import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryCapitalGame from './components/game/CountryCapitalGame';
import Footer from './components/Footer';

function App() {
	const queryCLient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<main>
			<QueryClientProvider client={queryCLient}>
				<CountryCapitalGame />
			</QueryClientProvider>
			<Footer />
		</main>
	);
}

export default App;
