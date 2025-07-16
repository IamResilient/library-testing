import { RawNode } from "@/types/types";

export const rawData: RawNode[] = [
    {
        name: 'Интегративное чувство жизни',
        description: 'Целостное переживание жизни как связной и осмысленной',
        radius: 40,
        overall_fulfillment_score: 0.5,
        children: [
            {
                name: 'Чувство связности',
                description: 'Ощущение, что все аспекты жизни взаимосвязаны',
                radius: 25,
                fulfillment_level_score: 0.5,
                children: [
                    {
                        name: 'Внутренняя согласованность',
                        description: 'Соответствие между ценностями, эмоциями и действиями',
                        radius: 16,
                        fulfillment_level_score: 0.5,
                        children: [
                            { name: 'Целостная идентичность', radius: 12 },
                            { name: 'Непротиворечивость поступков', radius: 12 },
                            { name: 'Понимание себя', radius: 12 }
                        ]
                    },
                    {
                        name: 'Связь с другими',
                        description: 'Ощущение включенности в человеческие отношения',
                        radius: 16,
                        fulfillment_level_score: 0.5,
                        children: [
                            { name: 'Сопричастность', radius: 12 },
                            { name: 'Глубокие связи', radius: 12 },
                            { name: 'Поддержка и эмпатия', radius: 12 }
                        ]
                    }
                ]
            },
            {
                name: 'Чувство смысла',
                description: 'Ощущение, что жизнь наполнена значением',
                radius: 25,
                fulfillment_level_score: 0.5,
                children: [
                    {
                        name: 'Экзистенциальный смысл',
                        description: 'Глобальное осознание предназначения и миссии',
                        radius: 16,
                        fulfillment_level_score: 0.5,
                        children: [
                            { name: 'Предназначение', radius: 12 },
                            { name: 'Жизненная миссия', radius: 12 },
                            { name: 'Ощущение вклада', radius: 12 }
                        ]
                    },
                    {
                        name: 'Смысл повседневности',
                        description: 'Значение, возникающее в ежедневных действиях',
                        radius: 16,
                        fulfillment_level_score: 0.5,
                        children: [
                            { name: 'Удовлетворение от труда', radius: 12 },
                            { name: 'Осмысленность ритуалов', radius: 12 },
                            { name: 'Присутствие в моменте', radius: 12 }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Неудовлетворённые потребности',
        description: 'Анализ неудовлетворённых жизненных потребностей',
        radius: 30,
        overall_fulfillment_score: 0.2125,
        children: [
            {
                name: 'Биологические и физиологические потребности',
                description: 'Базовые потребности для выживания и здоровья',
                radius: 25,
                fulfillment_level_score: 0.2,
                children: [
                    {
                        name: 'Сон',
                        description: 'Качество и продолжительность сна',
                        radius: 18,
                        fulfillment_level_score: 0.1,
                        children: [
                            { name: 'Продолжительность сна', radius: 12 },
                            { name: 'Постоянство сна', radius: 12 },
                            { name: 'Среда сна', radius: 12 }
                        ]
                    },
                    {
                        name: 'Питание',
                        description: 'Питательные и диетические потребности',
                        radius: 18,
                        fulfillment_level_score: 0.2,
                        children: [
                            { name: 'Гидратация', radius: 12 },
                            { name: 'Баланс питания', radius: 12 },
                            { name: 'Режим питания', radius: 12 }
                        ]
                    },
                    {
                        name: 'Физическая активность',
                        description: 'Потребности в движении и нагрузке',
                        radius: 18,
                        fulfillment_level_score: 0.3,
                        children: [
                            { name: 'Частота', radius: 12 },
                            { name: 'Интенсивность', radius: 12 },
                            { name: 'Разнообразие', radius: 12 }
                        ]
                    }
                ]
            },
            {
                name: 'Индивидуальные психологические потребности',
                description: 'Личностные ментальные и эмоциональные потребности',
                radius: 25,
                fulfillment_level_score: 0.2,
                children: [
                    {
                        name: 'Контроль',
                        description: 'Автономия и способность к принятию решений',
                        radius: 18,
                        fulfillment_level_score: 0.2,
                        children: [
                            { name: 'Автономия', radius: 12 },
                            { name: 'Рутина', radius: 12 },
                            { name: 'Структура', radius: 12 }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Эмоция / телесная перегрузка',
        description: 'Эмоциональные и физические реакции на стресс и давление',
        radius: 30,
        overall_fulfillment_score: 0.225,
        children: [
            {
                name: 'Эмоциональная перегрузка',
                description: 'Интенсивные эмоции, выходящие за пределы обычной регуляции',
                radius: 25,
                fulfillment_level_score: 0.225,
                children: [
                    {
                        name: 'Аффективные всплески',
                        description: 'Неуправляемые эмоциональные реакции',
                        radius: 18,
                        fulfillment_level_score: 0.225,
                        children: [
                            { name: 'Гнев и раздражение', radius: 12 },
                            { name: 'Паника и тревога', radius: 12 },
                            { name: 'Плач и отчаяние', radius: 12 }
                        ]
                    },
                    {
                        name: 'Эмоциональное выгорание',
                        description: 'Истощение от длительной нагрузки и тревоги',
                        radius: 18,
                        fulfillment_level_score: 0.225,
                        children: [
                            { name: 'Чувство опустошения', radius: 12 },
                            { name: 'Потеря мотивации', radius: 12 },
                            { name: 'Снижение эмпатии', radius: 12 }
                        ]
                    }
                ]
            },
            {
                name: 'Телесная перегрузка',
                description: 'Физиологическая реакция тела на эмоциональное напряжение',
                radius: 25,
                fulfillment_level_score: 0.225,
                children: [
                    {
                        name: 'Соматические проявления',
                        description: 'Физические симптомы при психоэмоциональном стрессе',
                        radius: 18,
                        fulfillment_level_score: 0.225,
                        children: [
                            { name: 'Мышечное напряжение', radius: 12 },
                            { name: 'Боли в груди', radius: 12 },
                            { name: 'Головные боли', radius: 12 }
                        ]
                    },
                    {
                        name: 'Физиологическая дестабилизация',
                        description: 'Нарушения в работе систем организма',
                        radius: 18,
                        fulfillment_level_score: 0.225,
                        children: [
                            { name: 'Нарушение пищеварения', radius: 12 },
                            { name: 'Изменения давления', radius: 12 },
                            { name: 'Сбои сна', radius: 12 }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Травма (если перегрузка сильная)',
        description: 'Психологическая травма вследствие сильного стресса',
        radius: 30,
        overall_fulfillment_score: 0.2,
        children: [
            {
                name: 'Диссоциация',
                description: 'Отключение от реальности как защита',
                radius: 20,
                fulfillment_level_score: 0.2,
                children: [
                    { name: 'Потеря времени', radius: 12 },
                    { name: 'Отключение тела', radius: 12 },
                    { name: 'Фантазийное мышление', radius: 12 }
                ]
            },
            {
                name: 'Стыд и вина',
                description: 'Чувства самообвинения и недостойности',
                radius: 20,
                fulfillment_level_score: 0.2,
                children: [
                    { name: 'Внутренний критик', radius: 12 },
                    { name: 'Ощущение неполноценности', radius: 12 },
                    { name: 'Изоляция', radius: 12 }
                ]
            },
            {
                name: 'Оцепенение',
                description: 'Физиологический и эмоциональный ступор',
                radius: 20,
                fulfillment_level_score: 0.2,
                children: [
                    { name: 'Ригидность тела', radius: 12 },
                    { name: 'Эмоциональная заморозка', radius: 12 },
                    { name: 'Потеря ориентации', radius: 12 }
                ]
            }
        ]
    },
    {
        name: 'Корневая установка',
        description: 'Фундаментальные убеждения, сформированные опытом',
        radius: 30,
        overall_fulfillment_score: 0.75, // стало зелёным
        children: [
            {
                name: 'Установка на недостойность',
                description: 'Глубокое убеждение в своей неполноценности',
                radius: 20,
                fulfillment_level_score: 0.8,
                children: [
                    {
                        name: 'Я не заслуживаю любви',
                        description: 'Ощущение, что любовь других — не про меня',
                        radius: 14,
                        fulfillment_level_score: 0.8,
                        children: [
                            { name: 'Изоляция от близких', radius: 12 },
                            { name: 'Саботаж отношений', radius: 12 },
                            { name: 'Стыд за потребности', radius: 12 }
                        ]
                    },
                    {
                        name: 'Я не достоин успеха',
                        description: 'Вера, что успех не должен быть моим',
                        radius: 14,
                        fulfillment_level_score: 0.8,
                        children: [
                            { name: 'Страх ответственности', radius: 12 },
                            { name: 'Перфекционизм', radius: 12 },
                            { name: 'Откладывание действий', radius: 12 }
                        ]
                    }
                ]
            },
            {
                name: 'Установка на уязвимость',
                description: 'Мир — опасен, я — слаб',
                radius: 20,
                fulfillment_level_score: 0.7,
                children: [
                    {
                        name: 'Мне нужно быть настороже',
                        description: 'Постоянная тревожность и ожидание угрозы',
                        radius: 14,
                        fulfillment_level_score: 0.7,
                        children: [
                            { name: 'Гиперконтроль', radius: 12 },
                            { name: 'Невозможность расслабиться', radius: 12 },
                            { name: 'Подозрительность', radius: 12 }
                        ]
                    }
                ]
            }
        ]
    }
]