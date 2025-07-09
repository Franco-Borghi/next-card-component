import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import styles from './page.module.scss';
import clsx from 'clsx';

export default function Home() {
	return (
		<section className={styles.home}>
			<h1>Marcas de diseño destacadas</h1>

			<div className={styles.line} />

			<div className={styles.text}>
				<p>Cualquiera que sea tu proyecto profesional o vital de interiorismo, decoración o paisajismo, en este espacio encontrarás muebles y artículos de decoración preloved de calidad derivados de shootings, exposiciones, ferias, devolución, outlets, etc.</p>

				<p>Un catálogo de segundas oportunidades de marcas fabricantes españolas o con sede en España, y sus distribuidores, en el que conviven tendencias, diseños clásicos, atemporales, combinación de materiales, acabados, etc.</p>

				<p>Sumemos talento y creatividad para diseñar cada espacio y cada edificio, contenido y continente, desde la cultura de la sostenibilidad.</p>

				<p>¡No hay proyecto más retador que mejorar el bienestar del Planeta!</p>
			</div>

			<div className={styles.filters}>
				<select name='order' id='order'>
					<option value=''>Ordenar por</option>
					<option value='price_asc'>Precio: menor a mayor</option>
					<option value='price_desc'>Precio: mayor a menor</option>
					<option value='name_asc'>Nombre: A-Z</option>
					<option value='name_desc'>Nombre: Z-A</option>
				</select>

				<select name='category' id='category'>
					<option value=''>Categoria</option>
				</select>

				<select name='Estancia' id='Estancia'>
					<option value=''>Estancia</option>
				</select>

				<select name='Precio' id='Precio'>
					<option value=''>Precio</option>
				</select>

				<select name='Dimensiones' id='Dimensiones'>
					<option value=''>Dimensiones</option>
				</select>

				<div>
					Todos los filtros <TuneIcon className={styles.icon} />
				</div>
			</div>

			<div className={styles.pills}>
				<div className={styles.pill}>
					<span>Sillas</span>
					<div className={styles.icon}>
						<CloseIcon sx={{ color: 'var(--beige-alaska)', fontSize: 16 }} />
					</div>
				</div>

				<div className={styles.pill}>
					<span>Comedor</span>
					<div className={styles.icon}>
						<CloseIcon sx={{ color: 'var(--beige-alaska)', fontSize: 16 }} />
					</div>
				</div>

				<div className={styles.pill}>
					<span>150€-350€</span>
					<div className={styles.icon}>
						<CloseIcon sx={{ color: 'var(--beige-alaska)', fontSize: 16 }} />
					</div>
				</div>

				<div className={clsx(styles.pill, styles.primary)}>
					<span>Borrar todo</span>
				</div>
			</div>

			<p className={styles.products}>657 productos disponibles</p>
		</section>
	);
}
