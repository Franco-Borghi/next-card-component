'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

export default function Create() {
	const router = useRouter();
	const [form, setForm] = useState({
		Name_items_showcase: '',
		Status_items_showcase: 'available',
		Price_items_showcase: '',
		Original_price_items_showcase: '',
		Discount_items_showcase: '',
		Min_price_offeritems_showcase: '',
		Delivery_items_showcase: '',
		Height_items_showcase: '',
		Width_items_showcase: '',
		Length_items_showcase: '',
	});

	const [response, setResponse] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...form,
					Price_items_showcase: Number(form.Price_items_showcase),
					Original_price_items_showcase: form.Original_price_items_showcase ? Number(form.Original_price_items_showcase) : undefined,
					Discount_items_showcase: form.Discount_items_showcase ? Number(form.Discount_items_showcase) : undefined,
					Min_price_offeritems_showcase: form.Min_price_offeritems_showcase ? Number(form.Min_price_offeritems_showcase) : undefined,
					Height_items_showcase: form.Height_items_showcase ? Number(form.Height_items_showcase) : undefined,
					Width_items_showcase: form.Width_items_showcase ? Number(form.Width_items_showcase) : undefined,
					Length_items_showcase: form.Length_items_showcase ? Number(form.Length_items_showcase) : undefined,
				}),
			});

			if (res.ok) {
				router.push('/productos');
			}

			const data = await res.json();
			setResponse(JSON.stringify(data, null, 2));
		} catch (error) {
			console.error(error);
			setResponse('Error al enviar el formulario');
		}
	};

	return (
		<section className={styles.section}>
			<h1>Crear producto</h1>
			<div className={styles.line} />

			{response && (
				<center style={{ paddingBottom: '16px', color: 'red' }}>
					<pre className={styles.response}>{JSON.parse(response)?.error}</pre>
				</center>
			)}

			<form onSubmit={handleSubmit} className={styles.create}>
				<label>
					Nombre <span style={{ color: 'red' }}>*</span>
					<input type='text' name='Name_items_showcase' value={form.Name_items_showcase} onChange={handleChange} required />
				</label>

				<label>
					Estado <span style={{ color: 'red' }}>*</span>
					<select name='Status_items_showcase' value={form.Status_items_showcase} onChange={handleChange} required>
						<option value='available'>Disponible</option>
						<option value='sold'>Vendido</option>
						<option value='donado'>Donado</option>
						<option value='rented'>Alquilado</option>
					</select>
				</label>

				<label>
					Precio actual <span style={{ color: 'red' }}>*</span>
					<input type='number' name='Price_items_showcase' value={form.Price_items_showcase} onChange={handleChange} required />
				</label>

				<label>
					Precio original
					<input type='number' name='Original_price_items_showcase' value={form.Original_price_items_showcase} onChange={handleChange} />
				</label>

				<label>
					Descuento
					<input type='number' name='Discount_items_showcase' value={form.Discount_items_showcase} onChange={handleChange} />
				</label>

				<label>
					Precio mínimo oferta
					<input type='number' name='Min_price_offeritems_showcase' value={form.Min_price_offeritems_showcase} onChange={handleChange} />
				</label>

				<label>
					Método de entrega
					<input type='text' name='Delivery_items_showcase' value={form.Delivery_items_showcase} onChange={handleChange} />
				</label>

				<label>
					Alto (cm)
					<input type='number' name='Height_items_showcase' value={form.Height_items_showcase} onChange={handleChange} />
				</label>

				<label>
					Ancho (cm)
					<input type='number' name='Width_items_showcase' value={form.Width_items_showcase} onChange={handleChange} />
				</label>

				<label>
					Largo (cm)
					<input type='number' name='Length_items_showcase' value={form.Length_items_showcase} onChange={handleChange} />
				</label>

				<button type='submit'>Crear producto</button>
			</form>
		</section>
	);
}
