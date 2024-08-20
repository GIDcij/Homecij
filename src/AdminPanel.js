import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminPanel = () => {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentButtonId, setCurrentButtonId] = useState(null);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const storage = getStorage();

  useEffect(() => {
    const fetchButtons = async () => {
      const querySnapshot = await getDocs(collection(db, 'buttons'));
      const buttonsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setButtons(buttonsData);
    };
    fetchButtons();
  }, []);

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let logoURL = '';

    if (logoFile) {
      const storageRef = ref(storage, `logos/${logoFile.name}`);
      await uploadBytes(storageRef, logoFile);
      logoURL = await getDownloadURL(storageRef);
    }

    try {
      if (isEditing && currentButtonId) {
        await updateDoc(doc(db, 'buttons', currentButtonId), {
          name,
          ip,
          logo: logoURL || null,
        });
        setIsEditing(false);
        setCurrentButtonId(null);
      } else {
        await addDoc(collection(db, 'buttons'), {
          name,
          ip,
          logo: logoURL || null,
        });
      }

      setName('');
      setIp('');
      setLogoFile(null);
      alert(isEditing ? 'Botón modificado' : 'Botón añadido');
    } catch (e) {
      console.error("Error añadiendo documento: ", e);
      alert('Error al añadir el botón.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteDoc(doc(db, 'buttons', id));
      setButtons(buttons.filter(button => button.id !== id));
      alert('Botón eliminado');
    } catch (e) {
      console.error("Error eliminando documento: ", e);
      alert('Error al eliminar el botón.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (button) => {
    setName(button.name);
    setIp(button.ip);
    setCurrentButtonId(button.id);
    setIsEditing(true);
    setShowEditMenu(false); // Cierra el menú de edición cuando se selecciona un botón para editar
  };

  const toggleEditMenu = () => {
    setShowEditMenu(!showEditMenu);
  };

  return (
    <div className="admin-container">
      <h2>{isEditing ? 'Editar Botón' : 'Crear un Nuevo Botón'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del botón"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="IP (con y sin puerto 'sin http://')"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? (isEditing ? 'Guardando...' : 'Añadiendo...') : (isEditing ? 'Guardar Cambios' : 'Añadir Botón')}
        </button>
      </form>

      <div className="edit-button-container">
        <button onClick={toggleEditMenu} className="edit-buttons-button">
          {showEditMenu ? 'Cerrar Menú de Edición' : 'Editar Botones'}
        </button>
      </div>

      {showEditMenu && (
        <div className="edit-menu">
          <h2>Gestionar Botones</h2>
          <div className="button-list">
            {buttons.map(button => (
              <div key={button.id} className="button-item">
                <h3>{button.name}</h3>
                <button onClick={() => handleEdit(button)} className="action-button">
                  Editar
                </button>
                <button onClick={() => handleDelete(button.id)} disabled={deleting} className="action-button">
                  {deleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
