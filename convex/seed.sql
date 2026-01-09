-- Seed Data for Voyager Website

-- Insert Airlines
INSERT INTO public_airlines (code, name, logo_url, website_url, description) VALUES
('LA', 'LATAM', 'https://example.com/logos/latam.png', 'https://www.latam.com', 'Companhia aérea brasileira e chilena, uma das maiores da América Latina.'),
('G3', 'GOL', 'https://example.com/logos/gol.png', 'https://www.voegol.com.br', 'Companhia aérea brasileira, conhecida por voos domésticos e preços competitivos.'),
('AD', 'Azul', 'https://example.com/logos/azul.png', 'https://www.voeazul.com.br', 'Companhia aérea brasileira, fundada em 2008, conhecida por atendimento e pontualidade.'),
('TP', 'TAP', 'https://example.com/logos/tap.png', 'https://www.flytap.com', 'Companhia aérea portuguesa, especializada em voos para Europa e África.'),
('AV', 'Avianca', 'https://example.com/logos/avianca.png', 'https://www.avianca.com', 'Companhia aérea colombiana, com voos para toda a América Latina.')
ON CONFLICT (code) DO NOTHING;

-- Insert Tips
INSERT INTO public_tips (title, content, category) VALUES
('Reserve com antecedência', 'Reserve suas passagens com pelo menos 21 dias de antecedência para conseguir os melhores preços.', 'economy'),
('Evite alta temporada', 'Evite viajar em alta temporada (feriados, férias escolares) quando os preços são muito mais altos.', 'economy'),
('Use milhas', 'Utilize programas de fidelidade e milhas para reduzir o custo das passagens.', 'economy'),
('Verifique a bagagem', 'Sempre verifique as regras de bagagem antes de comprar para evitar taxas extras.', 'baggage'),
('Leve apenas o necessário', 'Viaje com bagagem de mão para economizar em taxas de despacho.', 'baggage'),
('Passaporte válido', 'Certifique-se de que seu passaporte tenha validade mínima de 6 meses após a data da viagem.', 'documents'),
('Visto de entrada', 'Verifique se você precisa de visto para o destino e faça o pedido com antecedência.', 'documents'),
('Seguro viagem', 'Contrate um seguro viagem para se proteger contra imprevistos.', 'safety'),
('Escolha assentos com cuidado', 'Evite assentos próximos aos banheiros e cozinhas para maior conforto.', 'travel-tips'),
('Use sites de comparação', 'Compare preços em diferentes sites antes de comprar sua passagem.', 'travel-tips'),
('Melhores épocas para Europa', 'Maio, junho e setembro são os melhores meses para viajar para a Europa com preços mais baixos.', 'best-times'),
('Melhores épocas para EUA', 'Setembro e outubro são os melhores meses para viajar para os Estados Unidos com preços mais baixos.', 'best-times')
ON CONFLICT DO NOTHING;

-- Insert Sample Public Prices
INSERT INTO public_prices (origin, destination, airline, average_price, min_price, max_price) VALUES
('GRU', 'MIA', 'LA', 3500.00, 2800.00, 4500.00),
('GRU', 'MIA', 'G3', 3200.00, 2500.00, 4200.00),
('GRU', 'MIA', 'AD', 3400.00, 2700.00, 4300.00),
('GRU', 'JFK', 'LA', 4200.00, 3500.00, 5500.00),
('GRU', 'JFK', 'G3', 3900.00, 3200.00, 5200.00),
('GRU', 'JFK', 'AD', 4100.00, 3400.00, 5400.00),
('GRU', 'LHR', 'TP', 4500.00, 3800.00, 5800.00),
('GRU', 'CDG', 'TP', 4400.00, 3700.00, 5700.00),
('GYN', 'GRU', 'LA', 400.00, 300.00, 600.00),
('GYN', 'GRU', 'G3', 350.00, 250.00, 550.00),
('GYN', 'GRU', 'AD', 380.00, 280.00, 580.00),
('GYN', 'CGH', 'LA', 350.00, 250.00, 500.00),
('GYN', 'CGH', 'G3', 300.00, 200.00, 450.00),
('GYN', 'CGH', 'AD', 320.00, 220.00, 480.00)
ON CONFLICT (origin, destination, airline) DO NOTHING;
