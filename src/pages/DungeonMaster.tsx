import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShield, faHeart, faHeartBroken, faMinus, faPlus, faBullseye, faHammer } from '@fortawesome/free-solid-svg-icons';

interface Enemy {
    name: string;
    hp: number;
    totalHp: number;
    ca: number;
    dmg: string;
    acc: number;
}

interface ItemProps {
    value: number | string;
    icon: JSX.Element;
}

const DungeonMaster: React.FC = () => {
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [damage, setDamage] = useState(new Array(enemies.length).fill(0));
    const [newEnemyName, setNewEnemyName] = useState<string>('');
    const [newEnemyCA, setNewEnemyCA] = useState<number>(0);
    const [newEnemyTotalHp, setNewEnemyTotalHp] = useState<number>(0);
    const [newEnemyAcc, setNewEnemyAcc] = useState<number>(0);
    const [newEnemyDmg, setNewEnemyDmg] = useState<string>('');

    const handleDamage = (index: number, damageValue: number) => {
        setEnemies(prevEnemies => {
            const updatedEnemies = [...prevEnemies];
            updatedEnemies[index].hp += damageValue; // Add the damage value to the HP
            return updatedEnemies;
        });

        // Reset the damage value to 0 after applying it
        const newDamage = [...damage];
        newDamage[index] = 0;
        setDamage(newDamage);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newDamage = [...damage];
        newDamage[index] = Number(event.target.value);
        setDamage(newDamage);
    };

    const handleAddEnemy = (event: React.FormEvent) => {
        event.preventDefault();
        const newEnemy: Enemy = {
            name: newEnemyName,
            hp: newEnemyTotalHp,
            totalHp: newEnemyTotalHp,
            ca: newEnemyCA,
            dmg: newEnemyDmg,
            acc: newEnemyAcc,
        };
        setEnemies(prevEnemies => [...prevEnemies, newEnemy]);
        setDamage(prevDamage => [...prevDamage, 0]);
        setNewEnemyName('');
        setNewEnemyCA(10);
        setNewEnemyTotalHp(10);
        setNewEnemyAcc(2);
        setNewEnemyDmg('1d6');
    };

    const handleRemoveEnemy = (index: number) => {
        setEnemies(prevEnemies => {
            const updatedEnemies = [...prevEnemies];
            updatedEnemies.splice(index, 1);
            return updatedEnemies;
        });
        setDamage(prevDamage => {
            const updatedDamage = [...prevDamage];
            updatedDamage.splice(index, 1);
            return updatedDamage;
        });
    };

    const Item: React.FC<ItemProps> = ({ value, icon }) => {
        return (
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {icon} {value}
            </p>
        );
    };

    useEffect(() => {
        setDamage(new Array(enemies.length).fill(0));
    }, [enemies.length]);

    return (
        <div className='bg-gray-600 p-16 m-8 rounded flex justify-center'>
            <div className='space-y-4 mx-24'>
                <div className="flex items-center space-x-4 justify-center">
                    <form onSubmit={handleAddEnemy}>
                        <input 
                            type="text" 
                            placeholder="Enemy name" 
                            className='mr-3'
                            style={{ height: '32px', width: '240px', textAlign: 'center', borderRadius: '5px' }}
                            value={newEnemyName} 
                            onChange={event => setNewEnemyName(event.target.value)} 
                        />
                        <FontAwesomeIcon title='CA' className='mr-1' icon={faShield}/>
                        <input
                            type="number" 
                            placeholder="CA" 
                            className='mr-3'
                            style={{ height: '32px', width: '28px', textAlign: 'center', borderRadius: '5px' }}
                            value={newEnemyCA} 
                            onChange={event => setNewEnemyCA(Number(event.target.value))} 
                        />
                        <FontAwesomeIcon title='HP' className='mr-1' icon={faHeart}/>
                        <input 
                            type="number" 
                            placeholder="Total HP" 
                            className='mr-3'
                            style={{ height: '32px', width: '28px', textAlign: 'center', borderRadius: '5px' }}
                            value={newEnemyTotalHp} 
                            onChange={event => setNewEnemyTotalHp(Number(event.target.value))} 
                        />
                        <FontAwesomeIcon title='Acerto' className='mr-1' icon={faBullseye}/>
                        <input 
                            type="number" 
                            placeholder="ACC" 
                            className='mr-3'
                            style={{ height: '32px', width: '28px', textAlign: 'center', borderRadius: '5px' }}
                            value={newEnemyAcc} 
                            onChange={event => setNewEnemyAcc(Number(event.target.value))} 
                        />
                        <FontAwesomeIcon title='Dano' className='mr-1' icon={faHammer}/>
                        <select 
                            className='mr-3'
                            style={{ height: '32px', width: '56px', textAlign: 'center', borderRadius: '5px' }}
                            value={newEnemyDmg} 
                            onChange={event => setNewEnemyDmg(event.target.value)} 
                        >
                            <option value="1d4">1d4</option>
                            <option value="1d6">1d6</option>
                            <option value="1d8">1d8</option>
                            <option value="1d10">1d10</option>
                            <option value="1d12">1d12</option>
                        </select>
                        <button 
                            type="submit"
                            className="bg-black hover:bg-gray-900 text-white py-1 ml-1 px-2 rounded"
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </form>
                </div>
                {enemies.map((enemy, index) => (
                    <div key={index} className={`relative flex flex-col p-2 justify-between rounded bg-gray-500`}>
                        <button onClick={() => handleRemoveEnemy(index)} className="absolute top-2 left-2">
                            <FontAwesomeIcon icon={faClose} color='#ff1e00' />
                        </button>
                        <div className="flex items-center justify-between">
                            <h2 className='ml-6'><strong>{index + 1}. {enemy.name}</strong></h2>
                            <div className="flex items-center space-x-4">
                                <Item
                                    icon={<FontAwesomeIcon icon={faBullseye}/>}
                                    value={'+' + enemy.acc}
                                />
                                <Item
                                    icon={<FontAwesomeIcon icon={faHammer}/>}
                                    value={enemy.dmg}
                                />
                                <Item
                                    icon={<FontAwesomeIcon icon={faShield}/>}
                                    value={enemy.ca}
                                />
                                <Item
                                    icon={<FontAwesomeIcon icon={faHeart} color='#bf1a04'/>}
                                    value={enemy.totalHp}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-y-2 justify-between">
                            <div className='mt-2'>
                                <input
                                    type="number"
                                    className='mx-2'
                                    value={damage[index]}
                                    style={{ 
                                        width: '40px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                    }}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <button 
                                    onClick={() => handleDamage(index, -damage[index])}
                                    className='bg-gray-600 hover:bg-red-900 px-1 mx-1 rounded'
                                >
                                    <FontAwesomeIcon icon={faMinus} color='#ff1e00'/>
                                </button>
                                <button 
                                    onClick={() => handleDamage(index, damage[index])}
                                    className='bg-gray-600 hover:bg-green-900 px-1 mx-1 rounded'
                                >
                                    <FontAwesomeIcon icon={faPlus} color='#0aaa2c'/>
                                </button>
                            </div>
                            <Item
                                icon={<FontAwesomeIcon icon={faHeartBroken} color='#9e0b1f'/>}
                                value={enemy.hp}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DungeonMaster;